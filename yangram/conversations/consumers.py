from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.db import database_sync_to_async
from . import models
from yangram.users import models as user_model
from django.shortcuts import get_object_or_404
from django.utils import timezone

class ChatConsumer(AsyncWebsocketConsumer):
	@database_sync_to_async
	def check_participant(self,room_name,user):
		participation_info = get_object_or_404(models.Participant, conversation_id=room_name, participant_user=user)
		participation_info.last_read_date = timezone.now()
		participation_info.save()
		return participation_info
	
	@database_sync_to_async
	def addMessage(self,room_name,participant, message):
		newMessage = models.Message(message=message,participant=participant,conversation_id=room_name)
		newMessage.save()
		conversation_message =  models.Message.objects.select_related(
							'participant',
							'participant__participant_user'
						).values(
							'id',
							'message',
							'created_at',
							'message_type',
							'participant__participant_user__id'
						).get(id=newMessage.id)
		return  conversation_message
	async def connect(self):
		if self.scope["user"].is_anonymous:
			print("not connect anonymouse user")
			return await self.close()
		try:
			self.room_name = self.scope['url_route']['kwargs']['room_name']
			self.user = self.scope["user"]
			self.participant = await self.check_participant(self.room_name,self.user)
		except Exception as e:
			print('connect error',e)
			return await self.close()
		print("connect")
		self.room_group_name = 'chat_%s' % self.room_name
		# 그룹에 Join 하는 메서드이다.
		await self.channel_layer.group_add(
			self.room_group_name,
			self.channel_name
		)

		await self.accept()

	async def disconnect(self, close_code):
		# 그룹을 leave 하는 메서드이다.
		await self.channel_layer.group_discard(
			self.room_group_name,
			self.channel_name
		)

	# 웹소켓으로부터 메세지를 받아 처리하는 부분이다.
	# 아래에서는 그룹으로 메세지를 보내고 있다.
	async def receive(self, text_data):
		text_data_json = json.loads(text_data)
		message = text_data_json['message']
		try:
			newMessages = await self.addMessage(self.room_name, self.participant, message)
			# Send message to room group
			newMessages['created_at'] = newMessages['created_at'].strftime("%Y-%m-%d %H:%M:%S")		
			await self.channel_layer.group_send(
				self.room_group_name,
				{
					'type': 'chat_message',
					'message': newMessages
				}
			)
		except Exception as e:
			print('receive error',e)


	# 위의 receive 메서드에서 그룹으로 메세지를 보내면 그 메세지를 받아 처리하는 부분이다.
	async def chat_message(self, event):
		message = event['message']
		# 클라이언트로 웹소켓을 통해 받은 메세지를 다시 보내주는 부분이다.
		await self.send(text_data=json.dumps({
			'message': message
		}))
from django.shortcuts import render
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from yangram.conversations.models import *
from django.http import JsonResponse
from . import constants, sqls, serializers
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
User = get_user_model()
from django.utils import timezone
from django.contrib.humanize.templatetags.humanize import naturaltime
# Create your views here.
def room(request):
	context = {}
	return render(request, 'room.html', context)

@login_required
@csrf_exempt
def Conversations(request):
	if request.method == 'GET':
		try:
			page = int(request.GET.get('page'))
			user = request.user
			row = custom_sql_dictfetch_all(sqls.CONVERSATION_LIST_SQL,[user.id,user.id,page*constants.PAGE_SIZE])
			for item in row:
				item.update( {'message_created_time':naturaltime(item['message_created_at'])})
		except Exception as inst:
			print(inst)
			return JsonResponse( data={'err': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
		return JsonResponse({'conversationList':row}, safe=False, status=status.HTTP_200_OK)
	if request.method == 'POST':
		user = request.user
		if request.POST.get('user_id') is None:
			return JsonResponse({}, safe=False, status=status.HTTP_400_BAD_REQUEST)
		# firstquery = Participant.objects.filter(participant_user=user.id).filter(participant_user=request.POST.get('user_id'))
		convesrsation_with_user_id = request.POST.get('user_id')
		try:
			convesrsation_with_user = User.objects.get(id=convesrsation_with_user_id)
			existConversation = custom_sql_dictfetch_all(sqls.CHECK_CONVERSATION_EXISTS_SQL,[user.id,convesrsation_with_user_id])
		except:
			return JsonResponse( data={'err': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
		if len(existConversation) > 0:
			# 기존 대화방 존재
			return JsonResponse({"conversation_id": existConversation[0].get('conversation_id') }, safe=False, status=status.HTTP_201_CREATED)
		# 새 대화방 생성
		newConversation = Conversation(creator=user)
		newConversation.save()
		myParticipant = Participant(conversation=newConversation, participant_user=user)
		otherParticipant = Participant(conversation=newConversation, participant_user=convesrsation_with_user)
		myParticipant.save()
		otherParticipant.save()
		return JsonResponse({"conversation_id": newConversation.id }, safe=False, status=status.HTTP_201_CREATED)

@login_required
def SearchConversations(request):
	if request.method == 'GET':
		search_msg = request.GET.get('msg')
		if search_msg is None or search_msg=="":
			return JsonResponse({"conversations":[]}, safe=False, status=status.HTTP_400_BAD_REQUEST)
		try:
			user = request.user
			row = custom_sql_dictfetch_all(sqls.SEARCH_MESSAGE_SQL,[user.id,user.id,'%'+search_msg+'%'])
			for item in row:
				item.update( {'message_created_time':naturaltime(item['message_created_at'])})
		except:
			return JsonResponse( data={'err': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
		return JsonResponse({"conversations": list(row) }, safe=False, status=status.HTTP_201_CREATED)

@login_required
def ConversationMessage(request,conversation_id):
	if request.method == 'GET':
		try:
			last_message_id = int(request.GET.get('last_message_id'))
		except:
			return JsonResponse( data={'err': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)

		participation_info = get_object_or_404(Participant, conversation_id=conversation_id, participant_user=request.user)
		field_value_pairs = [('conversation_id', conversation_id)]
		if last_message_id>0:
			field_value_pairs.append(('id__lt', last_message_id))
		filter_options = {k:v for k,v in field_value_pairs if v}
		test_conversation_messages =  reversed(Message.objects.filter(
									**filter_options
								).order_by('-id')[:constants.PAGE_SIZE])
		serializer = serializers.FeedUserSerializer(test_conversation_messages, many=True)
		other_participations=[]
		if last_message_id==0:
			participation_info.last_read_date = timezone.now()
			participation_info.save()
			other_participations_data = Participant.objects.filter(
									conversation_id=conversation_id
								).exclude(
									participant_user=request.user
								)
			userInfo_serializer = serializers.ParticipantSerializer(other_participations_data, many=True)
			other_participations = userInfo_serializer.data
		return JsonResponse({'conversation_messages':serializer.data,'other_participations':other_participations}, safe=False, status=status.HTTP_200_OK)

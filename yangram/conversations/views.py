from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from yangram.conversations.models import *
from . import sqls
from django.http import JsonResponse
from . import constants
from rest_framework import status
from django.shortcuts import get_object_or_404

# Create your views here.
	# path('', view=views.Conversations, name="conversations"),
	# path('search/', view=views.SearchConversations, name="conversation_search"),
	# path('<int:conversation_id>/', view=views.ConversationDetail, name="conversation_detail"),
	# path('<int:conversation_id>/messages/', view=views.ConversationMessage, name="conversation_messages"),
# Create your views here.
def room(request):
	context = {}
	return render(request, 'room.html', context)

@login_required
def Conversations(request):
	if request.method == 'GET':
		try:
			page = int(request.GET.get('page'))
		except:
			return JsonResponse( data={'err': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
		user = request.user
		row = custom_sql_dictfetch_all(sqls.CONVERSATION_LIST_SQL,[user.id,user.id,page*constants.PAGE_SIZE])
		return JsonResponse({'conversationList':row}, safe=False, status=status.HTTP_200_OK)
	if request.method == 'POST':
		user = request.user
		if request.POST.get('user_id') is None:
			return JsonResponse({}, safe=False, status=status.HTTP_400_BAD_REQUEST)
		# firstquery = Participant.objects.filter(participant_user=user.id).filter(participant_user=request.POST.get('user_id'))
		convesrsation_with_user_id = request.POST.get('user_id')
		try:
			convesrsation_with_user = User.objects.get(id=convesrsation_with_user_id)
		except:
			return JsonResponse( data={'err': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
		
		existConversation = custom_sql_dictfetch_all(sqls.CHECK_CONVERSATION_EXISTS_SQL,[user.id,convesrsation_with_user_id])
		if len(existConversation) > 0:
			# 기존 대화방 존재
			return redirect('conversations:detail', conversation_id=existConversation[0].get('conversation_id'))
		# 새 대화방 생성
		newConversation = Conversation(creator=user)
		newConversation.save()
		myParticipant = Participant(conversation=newConversation, participant_user=user)
		otherParticipant = Participant(conversation=newConversation, participant_user=convesrsation_with_user)
		myParticipant.save()
		otherParticipant.save()
		return redirect('conversations:detail', conversation_id=newConversation.id)

@login_required
def SearchConversations(request):
	if request.method == 'GET':
		search_msg = request.GET.get('msg')
		if search_msg is None or search_msg=="":
			return JsonResponse({"conversations":[]}, safe=False, status=status.HTTP_400_BAD_REQUEST)
		user = request.user
		
		row = custom_sql_dictfetch_all(sqls.SEARCH_MESSAGE_SQL,[user.id,user.id,'%'+search_msg+'%'])
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
		conversation_messages =  Message.objects.filter(
									**filter_options
								).select_related(
									'participant',
									'participant__participant_user'
								).values(
									'id',
									'message',
									'created_at',
									'message_type',
									'participant__participant_user__id'
								).order_by('-id')[:constants.PAGE_SIZE]
		other_participations=[]
		if last_message_id==0:
			other_participations = Participant.objects.filter(
								conversation_id=conversation_id
							).exclude(
								participant_user=request.user
							).select_related(
								'participant_user'
							).values(
								'conversation_id',
								'participant_user__username', 
								'participant_user__profile_image'
							)
		return JsonResponse({'conversation_messages':list(conversation_messages),'other_participations':list(other_participations)}, safe=False, status=status.HTTP_200_OK)

from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from yangram.conversations.models import *
from . import sqls
from django.http import JsonResponse
from . import constants
from rest_framework import status

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
		user = request.user
		row = custom_sql_dictfetch_all(sqls.CONVERSATION_LIST_SQL,[user.id,user.id,0])
		unread_conversations_count = len([convesation for convesation in row if convesation.get('is_read')==0])
		if unread_conversations_count==constants.PAGE_SIZE: unread_conversations_count=str(constants.PAGE_SIZE)+'+'
		return JsonResponse({'conversationList': row,'conversation_messages':[],'other_participations':[],'unread_conversations_count':unread_conversations_count}, safe=False, status=status.HTTP_200_OK)
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
from django.urls import path
from . import views

app_name = 'conversations'

urlpatterns = [
	path('', view=views.Conversations, name="conversations"),
	# path('search/', view=views.SearchConversations, name="conversation_search"),
	# path('<int:conversation_id>/', view=views.ConversationDetail, name="conversation_detail"),
	# path('<int:conversation_id>/messages/', view=views.ConversationMessage, name="conversation_messages"),
	path('test/', views.room, name='room'),
]
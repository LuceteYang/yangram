from django.contrib import admin
from . import models

# Register your models here.
@admin.register(models.Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'creator',
        'created_at'
    )

@admin.register(models.Participant)
class ParticipantAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'conversation',
        'participant_user',
        'created_at',
        'last_read_date',
    )

@admin.register(models.Message)
class MessageAdmin(admin.ModelAdmin):
	list_display = (
        'id',
		'conversation',
		'participant',
		'message',
		'created_at',
		'deleted_at',
		'message_type',
	)

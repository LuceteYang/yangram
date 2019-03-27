from rest_framework import serializers
from . import models
from yangram.users import models as user_models


class MessageUserSerializer(serializers.ModelSerializer):

	class Meta:
		model = user_models.User
		fields = (
			'profile_image',
			'display_name',
		)

class ParticipantSerializer(serializers.ModelSerializer):
	participant_user = MessageUserSerializer(read_only = True)
	class Meta:
		model = models.Participant
		fields = (
			'id',
			'participant_user',
		)


class InputMessageSerializer(serializers.ModelSerializer):
	participant = ParticipantSerializer(read_only = True)
	class Meta:
		model = models.Message
		
		fields = (
			'id',
			'message',
			'message_type',
			'participant',
			'created_at'
		)

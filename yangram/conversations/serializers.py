from rest_framework import serializers
from . import models
from yangram.users import models as user_model

class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = user_model.User
		fields = (
			'id',
			'username',
			'profile_image'
		)

class ParticipantSerializer(serializers.ModelSerializer):
	participant_user = UserSerializer()
	class Meta:
		model = models.Participant
		fields = (
			'participant_user',
		)

class FeedUserSerializer(serializers.ModelSerializer):
	participant = ParticipantSerializer()
	class Meta:
		model = models.Message
		fields = (
			'id',
			'message',
			'created_time',
			'message_type',
			'participant'
		)
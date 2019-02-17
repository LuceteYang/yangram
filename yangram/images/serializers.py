from rest_framework import serializers
from . import models
from yangram.users import models as user_model

class FeedUserSerializer(serializers.ModelSerializer):

	class Meta:
		model = user_model.User
		fields = (
			'username',
			'profile_image'
		)

class CommentSerializer(serializers.ModelSerializer):
	
	creator = FeedUserSerializer(read_only=True) # 읽기 전용 필드는 API 출력에 포함되지만 create 또는 update 조작 중 입력에 포함되면 안됩니다. 

	class Meta:
		model = models.Comment
		fields = (
			'id',
			'message',
			'creator'
			)


class LikeSerializer(serializers.ModelSerializer):

	class Meta:
		model = models.Like
		fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):

	comments = CommentSerializer(many=True)
	creator = FeedUserSerializer()

	class Meta:
		model = models.Image
		fields = (
        	'id',
        	'file',
        	'creator',
        	'location',
        	'like_count',
        	'caption',
        	'comments',
    	)


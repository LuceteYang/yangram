from rest_framework import serializers
from . import models
from yangram.users import models as user_model
from taggit_serializer.serializers import (TagListSerializerField, TaggitSerializer)

class FeedUserSerializer(serializers.ModelSerializer):

	class Meta:
		model = user_model.User
		fields = (
			'username',
			'profile_image'
		)

class SmallImageSerializer(serializers.ModelSerializer):

    """ Used for the notifications """

    class Meta:
        model = models.Image
        fields = (
            'file',
        )

class CountImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Image
        fields = (
            'id',
            'file',
            'comment_count',
            'like_count'
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
		fields = (
            'creator',
        )


class ImageSerializer(serializers.ModelSerializer):

	comments = CommentSerializer(many=True)
	creator = FeedUserSerializer()
	tags = TagListSerializerField()

	class Meta:
		model = models.Image
		fields = (
        	'id',
        	'file',
        	'location',
        	'caption',
        	'creator',
        	'comments',
        	'like_count',
            'creator',
            'created_at',
            'tags'
    	)

class InputImageSerializer(serializers.ModelSerializer):


	class Meta:
		model = models.Image
		fields = (
        	'file',
        	'location',
        	'caption',
    	)


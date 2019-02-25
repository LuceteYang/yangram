from rest_framework import serializers
from . import models
from yangram.users import models as user_model
from taggit_serializer.serializers import (TagListSerializerField, TaggitSerializer)

class FeedUserSerializer(serializers.ModelSerializer):

	class Meta:
		model = user_model.User
		fields = (
			'username',
			'profile_image',
            'name',
            'bio',
            'website',
            'post_count',
            'followers_count',
            'following_count',
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
		fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):

	comments = CommentSerializer(many=True)
	creator = FeedUserSerializer()
	tags = TagListSerializerField()
	is_liked = serializers.SerializerMethodField()	#시리얼라이저의 함수 사용

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
			'natural_time',
			'tags',
			'is_liked',
            'is_vertical'
		)
	#get_~~~
	def get_is_liked(self, obj):
		if 'request' in self.context:
			request = self.context['request']
			try:
				models.Like.objects.get(creator__id=request.user.id, image__id=obj.id)
				return True
			except models.Like.DoesNotExist:
				return False
		return False

class InputImageSerializer(serializers.ModelSerializer):

	tags = TagListSerializerField()

	class Meta:
		model = models.Image
		fields = (
			'file',
			'location',
			'caption',
            'tags'
		)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from yangram.notifications import views as notification_views
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView

class UnserInfo(APIView):
    def get(self, request, format=None):
        user = request.user
        serializer = serializers.ListUserSerializer(user)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

class ExploreUsers(APIView):

    def get(self, request, format=None):

        user = request.user
        last_five = models.User.objects.all().order_by('-date_joined')[:5]
        serializer = serializers.ListUserSerializer(last_five, many=True, context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

class FollowUser(APIView):

    def post(self, request, user_id, format=None):

        user = request.user

        try:
            user_to_follow = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user.following.add(user_to_follow)

        user.save()

        # notification_views.create_notification(user, user_to_follow, 'follow')

        return Response(status=status.HTTP_200_OK)


class UnFollowUser(APIView):

    def post(self, request, user_id, format=None):

        user = request.user

        try:
            user_to_follow = models.User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user.following.remove(user_to_follow)

        user.save()

        return Response(status=status.HTTP_200_OK)

class UserProfile(APIView):

    def get_user(self, username):
        try:
            found_user = models.User.objects.get(username=username)
            return found_user
        except models.User.DoesNotExist:
            return None   

    def get(self, request, username, format=None):

        
        found_user = self.get_user(username=username)
        if found_user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = serializers.UserProfileSerializer(found_user, context={'request': request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)

    def put(self, request, username, format=None):
        
        user = request.user

        found_user = self.get_user(username=username)
        if found_user is None:
            return Response(status=status.HTTP_404_NOT_FOUND)

        elif found_user.username != user.username:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        else:
            serializer = serializers.UserProfileSerializer(found_user, data=request.data, partial=True) # field중 꼭 다 채워야 되지 않게됨
            if serializer.is_valid():
                serializer.save()
                return Response(data=serializer.data, status=status.HTTP_200_OK)

            else:
                return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class UserFollowers(APIView):

    def get(self, request, username, format=None):

        user = request.user

        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_folllowers = found_user.followers.all()

        serializer = serializers.ListUserSerializer(user_folllowers, many=True)


        return Response(data=serializer.data,status=status.HTTP_200_OK)

class UserFollowing(APIView):

    def get(self, request, username, format=None):

        user = request.user

        try:
            found_user = models.User.objects.get(username=username)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_following = found_user.following.all()

        serializer = serializers.ListUserSerializer(user_following, many=True)


        return Response(data=serializer.data,status=status.HTTP_200_OK)

class Search(APIView):

    def get(self, request, format=None):
        user = request.user
        username = request.query_params.get('username',None)

        if username is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        users = models.User.objects.filter(username__contains=username).exclude(id=user.id)

        serializer = serializers.ListUserSerializer(users, many=True, context={"request": request})
        return Response(data=serializer.data, status=status.HTTP_200_OK)

class ChangePassword(APIView):
    def put(self, request,username, format=None):

        user = request.user

        if user.username != username:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        current_password = request.data.get('current_password', None)

        if current_password is None:

            return Response(status=status.HTTP_400_BAD_REQUEST)

        passwords_match = user.check_password(current_password)
        
        if passwords_match is False:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        new_password = request.data.get('new_password', None)

        if new_password is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)

        user.save()

        return Response(status=status.HTTP_200_OK)


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


                

                

            


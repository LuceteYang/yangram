from django.db import models
from yangram.users import models as user_models
from yangram.images import models as image_models



class Notification(image_models.TimeStampedModel):

	TYPE_CHOICES=(
		('like','Like'),
		('comment','Comment'),
		('follow','Follow')
	)
	# 한 모델에서 user가 같은게 두개 있으므로 related_name 각각 선언해줘야함
	creator = models.ForeignKey(user_models.User, related_name= 'creator', on_delete=models.CASCADE)
	to =  models.ForeignKey(user_models.User, related_name= 'to', on_delete=models.CASCADE)
	notification_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
	image = models.ForeignKey(image_models.Image, on_delete=models.CASCADE)
	comment = models.TextField(null=True, blank=True)

	class Meta:
		ordering = ['-created_at']

	def __str__(self):
		return 'From: {} - To: {}'.format(self.creator, self.to)
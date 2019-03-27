from django.db import models, connection
from django.conf import settings

MESSAGE_TYPE = (
	(0, 'Text'),
	(1, 'Image')
)

def custom_sql_dictfetch_all(sql,param=[]):
	with connection.cursor() as cursor:
		cursor.execute(sql, param)
		columns = [col[0] for col in cursor.description]
		rows = [
			dict(zip(columns, row))
			for row in cursor.fetchall()
		]
	return rows

# Create your models here.
class Conversation(models.Model):
	creator = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)
	created_at = models.DateTimeField(auto_now_add=True)
	
	def __str__(self):
		return '{} , {}'.format(self.id, self.creator.username)

class Participant(models.Model):
	conversation = models.ForeignKey(Conversation, null=True, related_name="participants", on_delete=models.SET_NULL)
	participant_user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)
	created_at = models.DateTimeField(auto_now_add=True)
	last_read_date = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.participant_user.username

class Message(models.Model):
	id = models.BigAutoField(primary_key=True)
	conversation = models.ForeignKey(Conversation, null=True, related_name="messages", on_delete=models.SET_NULL)
	participant = models.ForeignKey(Participant, null=True, on_delete=models.SET_NULL)
	message = models.TextField()
	created_at = models.DateTimeField(auto_now_add=True)
	deleted_at = models.DateTimeField(null=True,blank=True)
	message_type = models.IntegerField(choices=MESSAGE_TYPE, default=0)

	def __str__(self):
		return self.message

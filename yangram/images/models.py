from django.db import models
from yangram.users import models as user_models
from taggit.managers import TaggableManager
from django.contrib.humanize.templatetags.humanize import naturaltime


class TimeStampedModel(models.Model):

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # 추상클래스
        abstract = True


class Image(TimeStampedModel):

    file = models.ImageField()
    location = models.CharField(max_length=140)
    caption = models.TextField()
    creator = models.ForeignKey(user_models.User, null=True, on_delete=models.CASCADE, related_name="images")
    tags = TaggableManager()

    # function
    # model field 데이터로 가진 않지만 프로펄티에 존재
    @property
    def like_count(self):
        return self.likes.all().count()

    @property
    def comment_count(self):
        return self.comments.all().count()
    @property
    def natural_time(self):
        return naturaltime(self.created_at)
    @property
    def is_vertical(self):
        if self.file.width < self.file.height:
            return True
        else:
            return False

    def __str__(self):
        return '{} - {}'.format(self.location, self.caption)

    class Meta:
        ordering = ['-created_at']

class Comment(TimeStampedModel):

    message = models.TextField()
    creator = models.ForeignKey(user_models.User, null=True, on_delete=models.CASCADE)
    image = models.ForeignKey(Image, null=True, on_delete=models.CASCADE, related_name="comments")

    def __str__(self):
        return self.message

class Like(TimeStampedModel):

    creator = models.ForeignKey(user_models.User, null=True, on_delete=models.CASCADE)
    image = models.ForeignKey(Image, null=True, on_delete=models.CASCADE, related_name="likes")

    def __str__(self):
        return 'User: {} - Image Caption: {}'.format(self.creator.username, self.image.caption)
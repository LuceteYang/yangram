# Generated by Django 2.0.10 on 2019-02-17 01:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('images', '0002_auto_20190216_1731'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='image',
            options={'ordering': ['-created_at']},
        ),
        migrations.AlterField(
            model_name='comment',
            name='image',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='images.Image'),
        ),
        migrations.AlterField(
            model_name='image',
            name='creator',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='images', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='like',
            name='image',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='images.Image'),
        ),
    ]

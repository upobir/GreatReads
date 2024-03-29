# Generated by Django 4.0.5 on 2022-07-14 18:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0004_alter_author_followers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='genres',
            field=models.ManyToManyField(blank=True, to='api.genre'),
        ),
        migrations.AlterField(
            model_name='book',
            name='isbn',
            field=models.CharField(max_length=12, unique=True),
        ),
        migrations.AlterField(
            model_name='book',
            name='readers',
            field=models.ManyToManyField(blank=True, through='api.BookUserStatus', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='book',
            name='release_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='book',
            name='series',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.series'),
        ),
        migrations.AlterField(
            model_name='book',
            name='series_number',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='book',
            name='thumbnail',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
    ]

# Generated by Django 2.2.6 on 2019-10-20 01:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shelves', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=64, unique=True)),
            ],
        ),
    ]

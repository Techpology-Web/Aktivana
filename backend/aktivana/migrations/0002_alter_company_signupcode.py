# Generated by Django 4.0.5 on 2022-11-06 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aktivana', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='signupCode',
            field=models.TextField(default='femilltku'),
        ),
    ]

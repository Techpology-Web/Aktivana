# Generated by Django 4.1 on 2022-11-09 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aktivana', '0012_alter_company_signupcode_passwordreset'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='name',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='company',
            name='email',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='company',
            name='password',
            field=models.TextField(default=''),
        ),
    ]

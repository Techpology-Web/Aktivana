# Generated by Django 4.1 on 2022-11-05 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aktivana', '0003_alter_company_signupcode'),
    ]

    operations = [
        migrations.AlterField(
            model_name='company',
            name='signupCode',
            field=models.TextField(default='xlfrakdwe'),
        ),
    ]

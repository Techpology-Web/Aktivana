# Generated by Django 4.1 on 2022-11-06 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aktivana', '0009_alter_company_signupcode'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Acount',
            new_name='Account',
        ),
        migrations.AlterField(
            model_name='company',
            name='signupCode',
            field=models.TextField(default='oqnfcricp'),
        ),
    ]

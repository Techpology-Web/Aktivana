# Generated by Django 4.1 on 2022-11-22 20:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('aktivana', '0013_company_name_alter_company_email_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='partner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='aktivana.partner'),
        ),
        migrations.AlterField(
            model_name='account',
            name='company',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='aktivana.company'),
        ),
    ]

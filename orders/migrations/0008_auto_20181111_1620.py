# Generated by Django 2.0.3 on 2018-11-11 12:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0007_auto_20181111_1613'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='pizza',
        ),
        migrations.AddField(
            model_name='order',
            name='pizza',
            field=models.ManyToManyField(blank=True, related_name='pizza', to='orders.Pizza'),
        ),
    ]

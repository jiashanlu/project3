# Generated by Django 2.0.3 on 2018-11-13 06:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0019_auto_20181113_1046'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderpizza',
            name='topping',
            field=models.ManyToManyField(blank=True, related_name='topping', to='orders.Topping'),
        ),
    ]

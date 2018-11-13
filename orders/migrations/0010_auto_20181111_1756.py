# Generated by Django 2.0.3 on 2018-11-11 13:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0009_pizza_topping'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderPizza',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.RemoveField(
            model_name='order',
            name='pizza',
        ),
        migrations.AddField(
            model_name='order',
            name='pizza',
            field=models.ManyToManyField(blank=True, related_name='pizza', through='orders.OrderPizza', to='orders.Pizza'),
        ),
        migrations.AddField(
            model_name='orderpizza',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.Order'),
        ),
        migrations.AddField(
            model_name='orderpizza',
            name='pizza',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.Pizza'),
        ),
        migrations.AddField(
            model_name='orderpizza',
            name='topping',
            field=models.ManyToManyField(blank=True, to='orders.Topping'),
        ),
    ]
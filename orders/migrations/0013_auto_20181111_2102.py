# Generated by Django 2.0.3 on 2018-11-11 17:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0012_remove_order_topping'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrderPasta',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.RemoveField(
            model_name='order',
            name='pasta',
        ),
        migrations.AddField(
            model_name='order',
            name='pasta',
            field=models.ManyToManyField(blank=True, related_name='pasta', through='orders.OrderPasta', to='orders.Pasta'),
        ),
        migrations.AddField(
            model_name='orderpasta',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.Order'),
        ),
        migrations.AddField(
            model_name='orderpasta',
            name='pasta',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.Pasta'),
        ),
    ]

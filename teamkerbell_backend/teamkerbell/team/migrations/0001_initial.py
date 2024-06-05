# Generated by Django 5.0.4 on 2024-06-03 10:21

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("comp", "0002_initial"),
        ("user", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="PreviousWinning",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("img", models.TextField(null=True)),
                ("title", models.CharField(default="default_value", max_length=100)),
                ("interview", models.TextField()),
                (
                    "comp",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="previouswinnings",
                        to="comp.comp",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Team",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("recruitNum", models.IntegerField(default=0)),
                ("startDate", models.DateField(default=django.utils.timezone.now)),
                ("endVote", models.IntegerField(default=0)),
                ("isRandom", models.BooleanField(default=False)),
                ("isDone", models.BooleanField(default=False)),
                (
                    "repository",
                    models.CharField(default="http://github.com", max_length=100),
                ),
                (
                    "comp",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="teams",
                        to="comp.comp",
                    ),
                ),
                (
                    "leader",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="teams",
                        to="user.basicuser",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Schedule",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("startDate", models.CharField(default="default_value", max_length=50)),
                ("endDate", models.CharField(default="default_value", max_length=50)),
                ("schedule", models.CharField(default="default_value", max_length=255)),
                (
                    "team",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="schedules",
                        to="team.team",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="OutReason",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("isKick", models.BooleanField(default=False)),
                ("reason", models.TextField(default="default_value")),
                (
                    "user",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="reasons",
                        to="user.basicuser",
                    ),
                ),
                (
                    "team",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="reasons",
                        to="team.team",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="FinalCheck",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                (
                    "reporter",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="finalChecksReporters",
                        to="user.basicuser",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="finalChecks",
                        to="user.basicuser",
                    ),
                ),
                (
                    "team",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="finalChecks",
                        to="team.team",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="TeamEndVote",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "team",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="teamendvotes",
                        to="team.team",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="teamendvotes",
                        to="user.basicuser",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ChooseTeam",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(default="default_value", max_length=255)),
                ("startDate", models.CharField(default="0", max_length=50)),
                ("intro", models.TextField(default="default_value")),
                ("method", models.CharField(default="default_value", max_length=50)),
                ("language", models.CharField(default="default_value", max_length=50)),
                ("qualification", models.TextField(default="default_value")),
                (
                    "comp",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="chooseteams",
                        to="comp.comp",
                    ),
                ),
                (
                    "team",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="team.team"
                    ),
                ),
            ],
            options={
                "unique_together": {("team", "comp")},
            },
        ),
        migrations.CreateModel(
            name="TeamMate",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("isTeam", models.BooleanField(default=False)),
                ("role", models.CharField(default="role")),
                (
                    "resume",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="teammates",
                        to="user.resume",
                    ),
                ),
                (
                    "team",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="teammates",
                        to="team.team",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="teammates",
                        to="user.basicuser",
                    ),
                ),
            ],
            options={
                "unique_together": {("resume", "user", "team")},
            },
        ),
        migrations.CreateModel(
            name="TeamRole",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("role", models.CharField(max_length=50)),
                ("recruitNum", models.IntegerField(default=0)),
                ("num", models.IntegerField(default=0)),
                (
                    "team",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="teamroles",
                        to="team.team",
                    ),
                ),
            ],
            options={
                "unique_together": {("role", "team")},
            },
        ),
    ]

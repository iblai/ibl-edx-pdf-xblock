"""
App Configuration for pdf
"""

import logging

from django.apps import AppConfig

log = logging.getLogger(__name__)


class IBLpdfXBlock(AppConfig):
    """
    App Configuration for pdf
    """

    name = "pdf"
    verbose_name = "IBL pdf xblock"

    plugin_app = {
        "settings_config": {
            "lms.djangoapp": {
                "common": {
                    "relative_path": "settings.common",
                },
            },
            "cms.djangoapp": {
                "common": {
                    "relative_path": "settings.common",
                },
            },
        },
    }

    def ready(self):
        from . import signals  # noqa

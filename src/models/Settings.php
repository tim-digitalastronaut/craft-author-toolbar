<?php

namespace digitalastronaut\craftauthortoolbar\models;

use Craft;
use craft\base\Model;

/**
 * author-toolbar settings
 */
class Settings extends Model {
    public bool $toolbarEnabled = true;

    public bool $globalSearchEnabled = true;
    public bool $actionButtonsEnabled = true;
    public bool $seoMenuEnabled = true;
    public bool $seoChecklistEnabled = true;
    public bool $seoSharePreviewsEnabled = true;
    public bool $seoImagesEnabled = true;
    public bool $seoHeadingsEnabled = true;
    public bool $seoStructuredDataEnabled = true;
    public array $customWidgets = [];

    public string $company = '';
    public array $companyLogo = [];
    public string $email = '';
    public string $phoneNumber = '';
    public string $issueTicketUrl = '';
    public string $info = '';
}

<?php

namespace digitalastronaut\craftauthortoolbar\models;

use Craft;
use craft\base\Model;

/**
 * author-toolbar settings
 */
class Settings extends Model {
    public bool $toolbarEnabled = true;

    public bool $startMenuEnabled = true;
    public bool $globalSearchEnabled = true;
    public bool $actionButtonsEnabled = true;
    public bool $seoMenuEnabled = true;
    public bool $helpMenuEnabled = true;
    public bool $contextBarEnabled = true;

    public bool $dashboardLinkEnabled = true;
    public bool $entriesLinkEnabled = true;
    public bool $ordersLinkEnabled = true;
    public bool $productsLinkEnabled = true;
    public bool $inventoryLinkEnabled = true;
    public bool $assetsLinkEnabled = true;
    public bool $accountSettingsLinkEnabled = true;
    public bool $logoutLinkEnabled = true;

    public array $customStartMenuLinks = [
        ["label" => "", "href" => "", "enabled" => false]
    ];
    public array $customChunks = [];

    public string $company = '';
    public array $companyLogo = [];
    public string $email = '';
    public string $phoneNumber = '';
    public string $issueTicketUrl = '';
    public string $info = '';
}

<?php

namespace digitalastronaut\craftauthortoolbar\models;

use Craft;
use craft\base\Model;

/**
 * Class SettingsModel
 *
 * @author      Digitalastronaut
 * @package     Author toolbar
 * @since       v1.0.0-beta
 */
class Settings extends Model {
    /**
     * @var bool if the toolbar should be shown on frontend pages
     */
    public bool $toolbarEnabled = true;

    /**
     * @var bool if the start menu chunk should be shown in the toolbar
     */
    public bool $startMenuEnabled = true;

    /**
     * @var bool if the global search chunk should be shown in the toolbar
     */
    public bool $globalSearchEnabled = true;

    /**
     * @var bool if the action buttons chunk should be shown in the toolbar
     */
    public bool $actionButtonsEnabled = true;

    /**
     * @var bool if the seo menu chunk and all it's sub tabs should be shown in the toolbar
     */
    public bool $seoMenuEnabled = true;

    /**
     * @var bool if the help menu chunk should be shown in the toolbar
     */
    public bool $helpMenuEnabled = true;

    /**
     * @var bool if the context bar should be shown
     */
    public bool $contextBarEnabled = true;

    /**
     * @var array contains a list of entry id's that can be created via the action buttons chunk
     */
    public array $creatableEntries = [];

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

    /**
     * @inheritDoc
     * @return array
     */
    protected function defineRules(): array {
        return [
            [
                [
                    'toolbarEnabled',
                    'startMenuEnabled',
                    'globalSearchEnabled',
                    'actionButtonsEnabled',
                    'seoMenuEnabled',
                    'helpMenuEnabled',
                    'contextBarEnabled',
                    'dashboardLinkEnabled',
                    'entriesLinkEnabled',
                    'ordersLinkEnabled',
                    'productsLinkEnabled',
                    'inventoryLinkEnabled',
                    'assetsLinkEnabled',
                    'accountSettingsLinkEnabled',
                    'logoutLinkEnabled',
                ],
                'boolean'
            ],

            [['creatableEntries', 'customStartMenuLinks', 'customChunks', 'companyLogo'], 'safe'],

            [['company', 'email', 'phoneNumber', 'issueTicketUrl', 'info'], 'string'],

            ['email', 'email'],

            ['issueTicketUrl', 'url', 'defaultScheme' => 'https'],
        ];
    }
}

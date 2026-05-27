<?php
/**
 * Author toolbar plugin for Craft CMS
 *
 * A frontend toolbar that enhances the authoring experience by giving content
 * editors quick access to editing tools, entry actions, and contextual
 * controls directly from the site frontend.
 *
 * @link      https://digitalastronaut.be
 * @copyright Copyright (c) 2026 Digitalastronaut
 */

namespace digitalastronaut\craftauthortoolbar\models;

use craft\base\Model;

/**
 * Class Settings
 *
 * @author      Digitalastronaut
 * @package     AuthorToolbar
 * @since       v1.0.0-beta
 */
class Settings extends Model {
    public bool $toolbarEnabled = true;
    public bool $toolbarCollapsedByDefault = true;

    public bool $startMenuEnabled = true;
    public bool $globalSearchEnabled = true;
    public bool $actionButtonsEnabled = true;
    public bool $seoMenuEnabled = true;
    public bool $helpMenuEnabled = true;
    public bool $contextBarEnabled = true;

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

    public bool $environmentMessageEnabled = false;

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

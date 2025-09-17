<?php

namespace brammortier\craftauthortoolbar\models;

use Craft;
use craft\base\Model;

/**
 * author-toolbar settings
 */
class Settings extends Model {
    public bool $toolbarEnabled = true;
    public string $company = '';
    public array $companyLogo = [];
    public string $email = '';
    public string $phoneNumber = '';
    public string $issueTicketUrl = '';
    public string $info = '';
}

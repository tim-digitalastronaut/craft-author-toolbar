<?php

namespace digitalastronaut\craftauthortoolbar;

use Craft;
use craft\web\View;
use craft\web\UrlManager;

use craft\base\Model;
use craft\base\Plugin;
use craft\base\Event;

use craft\helpers\UrlHelper;

use craft\events\RegisterTemplateRootsEvent;
use craft\events\TemplateEvent;
use craft\events\RegisterUrlRulesEvent;

use digitalastronaut\craftauthortoolbar\models\Settings;
use digitalastronaut\craftauthortoolbar\web\assets\AuthorToolbarAssets;

/**
 * Author toolbar plugin
 *
 * @method static AuthorToolbar getInstance()
 * @author digitalastronaut <bram@digitalastronaut.be>
 * @license https://craftcms.github.io/license/ Craft License
 */
class AuthorToolbar extends Plugin {
    public string $schemaVersion = 'v1.0.9-beta';
    public bool $hasCpSettings = true;

    public function init(): void {
        parent::init();

        $this->_registerTemplateRoots();
        
        $this->setComponents([]);
        
        if (Craft::$app->getRequest()->getIsCpRequest()) {
            $this->_registerCpRoutes();
        }
        
        if (Craft::$app->getRequest()->getIsSiteRequest()) {
            $this->_registerSiteRoutes();
            $this->_registerToolbar();
        }
    }

    protected function createSettingsModel(): ?Model {
        return Craft::createObject(Settings::class);
    }

    public function getSettingsResponse(): mixed {
		return Craft::$app->controller->redirect(UrlHelper::cpUrl('author-toolbar/settings'));
	}

    private function _registerTemplateRoots(): void {
        Event::on(
            View::class,
            View::EVENT_REGISTER_SITE_TEMPLATE_ROOTS,
            function(RegisterTemplateRootsEvent $event) {
                $event->roots['author-toolbar'] = $this->getBasePath() . '/templates';
            }
        );
    }

    private function _registerSiteRoutes(): void {
        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_SITE_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
                $event->rules['author-toolbar/search'] = 'author-toolbar/search/index';
                $event->rules['author-toolbar/seo/previews'] = 'author-toolbar/seo/previews';
            }
        );
    }

    private function _registerCpRoutes(): void {
        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_CP_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
                $event->rules['author-toolbar/settings'] = 'author-toolbar/settings/index';
            }
        );
    }

    private function _registerToolbar(): void {
        Event::on(
            View::class,
            View::EVENT_BEFORE_RENDER_PAGE_TEMPLATE,
            function (TemplateEvent $event) {
                $entry = $event->variables['entry'] ?? null;
                $settings = $this->getSettings();

                if (!$settings->toolbarEnabled) return;

                Craft::$app->getView()->registerAssetBundle(AuthorToolbarAssets::class);

                $html = Craft::$app->getView()->renderTemplate('author-toolbar/_toolbar.twig', [
                    'entry' => $entry,
                    'settings' => $settings
                ]);

                Craft::$app->getView()->registerHtml($html, View::POS_BEGIN);
            }
        );
    }
}

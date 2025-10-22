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
use craft\events\RegisterUserPermissionsEvent;
use craft\services\UserPermissions;

use digitalastronaut\craftauthortoolbar\models\Settings;
use digitalastronaut\craftauthortoolbar\web\assets\AuthorToolbarAssets;
use digitalastronaut\craftauthortoolbar\web\twig\AuthorToolbarTwigExtension;

/**
 * Author toolbar plugin
 *
 * @method static AuthorToolbar getInstance()
 * @author digitalastronaut <bram@digitalastronaut.be>
 * @license https://craftcms.github.io/license/ Craft License
 */
class AuthorToolbar extends Plugin {
    public string $schemaVersion = 'v1.1.9-beta';
    public bool $hasCpSettings = true;

    public function init(): void {
        parent::init();

        $this->_registerTemplateRoots();
        $this->_registerPermissions();
        
        $this->setComponents([]);
        
        if (Craft::$app->request->isCpRequest) {
            $this->_registerAssetBundles();
            $this->_registerCpRoutes();
        }
        
        if (Craft::$app->request->isSiteRequest) {
            $this->_registerAssetBundles();
            $this->_registerTwigExtensions();
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

    private function _registerPermissions(): void {
        Event::on(UserPermissions::class, UserPermissions::EVENT_REGISTER_PERMISSIONS, function(RegisterUserPermissionsEvent $event) {
            $event->permissions[] = [
                'heading' => 'Author toolbar',
                'permissions' => [
                    'authorToolbar-accessToolbar' => ['label' => Craft::t('author-toolbar', 'Access toolbar')],
                    'authorToolbar-editSettings' => ['label' => Craft::t('author-toolbar', 'Edit settings')],
                    // 'authorToolbar-accessAdvancedToolbar' => ['label' => Craft::t('author-toolbar', 'Access advanced toolbar'), 'info' => Craft::t('author-toolbar', 'This is info')],
                ],
            ];
        });
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

    private function _registerAssetBundles(): void {
        Craft::$app->view->registerAssetBundle(AuthorToolbarAssets::class);
    }

    private function _registerTwigExtensions(): void {
        Craft::$app->view->registerTwigExtension(new AuthorToolbarTwigExtension());
    }

    private function _registerToolbar(): void {
        Event::on(
            View::class,
            View::EVENT_BEFORE_RENDER_PAGE_TEMPLATE,
            function (TemplateEvent $event) {
                $entry = $event->variables['entry'] ?? $event->variables['product'] ?? null;

                $settings = $this->getSettings();

                if (!$settings->toolbarEnabled) return;
                if (!Craft::$app->user->checkPermission('authorToolbar-accessToolbar')) return;
                if (Craft::$app->request->isPreview) return;
                if (Craft::$app->request->isAjax) return;
                if (Craft::$app->request->isConsoleRequest) return;

                $html = Craft::$app->getView()->renderTemplate('author-toolbar/_toolbar.twig', [
                    'entry' => $entry,
                    'settings' => $settings
                ]);

                Craft::$app->getView()->registerHtml($html, View::POS_BEGIN);
            }
        );
    }
}

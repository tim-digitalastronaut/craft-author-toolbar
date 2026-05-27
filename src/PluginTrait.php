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

namespace digitalastronaut\craftauthortoolbar;

use Craft;
use craft\web\View;
use craft\web\UrlManager;

use craft\base\Event;

use craft\events\RegisterTemplateRootsEvent;
use craft\events\TemplateEvent;
use craft\events\RegisterUrlRulesEvent;
use craft\events\RegisterUserPermissionsEvent;

use craft\services\UserPermissions;

use digitalastronaut\craftauthortoolbar\web\assets\AuthorToolbarAssets;
use digitalastronaut\craftauthortoolbar\web\twig\AuthorToolbarTwigExtension;

/**
 * Class PluginTrait
 *
 * @author      Digitalastronaut
 * @package     AuthorToolbar
 * @since       v1.2.8-beta
 */
trait PluginTrait {
    /**
     * @return void
     */
    protected function registerEvents(): void {
        $this->registerSharedEvents();

        if (Craft::$app->request->isConsoleRequest) $this->registerConsoleEvents();
        if (Craft::$app->request->isSiteRequest) $this->registerSiteEvents();
        if (Craft::$app->request->isCpRequest) $this->registerCpEvents();
    }

    /**
     * @return void
     */
    protected function registerConsoleEvents(): void {
        // Register any console events
    }

    /**
     * @return void
     */
    protected function registerSharedEvents(): void {
        // Register shared events
    }
        
    /**
     * @return void
    */
    protected function registerCpEvents(): void {
        $this->registerTemplateRoots();
        $this->registerAssetBundles();
        $this->registerPermissions();
        $this->registerCpRoutes();
    }
        
    /**
     * @return void
    */
    protected function registerSiteEvents(): void {
        $this->registerTemplateRoots();
        $this->registerAssetBundles();
        $this->registerTwigExtensions();
        $this->registerSiteRoutes();
        $this->registerToolbarHtml();
    }

    /**
     * @return void
     */
    protected function registerTemplateRoots(): void {
        Event::on(
            View::class,
            View::EVENT_REGISTER_SITE_TEMPLATE_ROOTS,
            function(RegisterTemplateRootsEvent $event) {
                $event->roots['author-toolbar'] = $this->getBasePath() . '/templates';
            }
        );
    }

    /**
     * @return void
     */
    protected function registerPermissions(): void {
        Event::on(UserPermissions::class, UserPermissions::EVENT_REGISTER_PERMISSIONS, function(RegisterUserPermissionsEvent $event) {
            $event->permissions[] = [
                'heading' => 'Author toolbar',
                'permissions' => [
                    'author-toolbar:access-toolbar' => [
                        'label' => Craft::t('author-toolbar', 'Access toolbar'),
                        'nested' => [
                            'author-toolbar:access-start-menu' => [
                                'label' => Craft::t('author-toolbar', 'Access the startmenu'),
                            ],
                            'author-toolbar:access-action-buttons' => [
                                'label' => Craft::t('author-toolbar', 'Access action buttons'),
                            ],
                            'author-toolbar:access-global-search' => [
                                'label' => Craft::t('author-toolbar', 'Access global search'),
                            ],
                            'author-toolbar:access-seo-menu' => [
                                'label' => Craft::t('author-toolbar', 'Access SEO menu'),
                            ],
                            'author-toolbar:access-help-menu' => [
                                'label' => Craft::t('author-toolbar', 'Access help menu'),
                            ],
                            'author-toolbar:access-context-bar' => [
                                'label' => Craft::t('author-toolbar', 'Access the context bar'),
                            ],
                            'author-toolbar:access-custom-chunks' => [
                                'label' => Craft::t('author-toolbar', 'Access custom chunks'),
                            ],
                        ]
                    ],
                    'author-toolbar:edit-settings' => [
                        'label' => Craft::t('author-toolbar', 'Edit settings'),
                        'nested' => [
                            'author-toolbar:edit-chunks' => [
                                'label' => Craft::t('author-toolbar', 'Edit chunks')
                            ],
                            'author-toolbar:edit-start-menu' => [
                                'label' => Craft::t('author-toolbar', 'Edit start menu')
                            ],
                            'author-toolbar:edit-action-buttons' => [
                                'label' => Craft::t('author-toolbar', 'Edit action buttons')
                            ],
                            'author-toolbar:edit-help-menu' => [
                                'label' => Craft::t('author-toolbar', 'Edit help menu')
                            ],
                        ]
                    ],
                ],
            ];
        });
    }

    /**
     * @return void
     */
    protected function registerCpRoutes(): void {
        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_CP_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
                $event->rules['author-toolbar/settings'] = 'author-toolbar/settings/index';
            }
        );
    }

    /**
     * @return void
     */
    protected function registerSiteRoutes(): void {
        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_SITE_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
                $event->rules['author-toolbar/search'] = 'author-toolbar/search/index';
                $event->rules['author-toolbar/seo/previews'] = 'author-toolbar/seo/previews';
            }
        );
    }

    /**
     * @return void
     */
    protected function registerAssetBundles(): void {
        Craft::$app->view->registerAssetBundle(AuthorToolbarAssets::class);
    }

    /**
     * @return void
     */
    protected function registerTwigExtensions(): void {
        Craft::$app->view->registerTwigExtension(new AuthorToolbarTwigExtension());
    }

    /**
     * @return void
     */
    protected function registerToolbarHtml(): void {
        Event::on(
            View::class,
            View::EVENT_BEFORE_RENDER_PAGE_TEMPLATE,
            function (TemplateEvent $event) {
                $entry = $event->variables['entry'] ?? $event->variables['product'] ?? null;
                if (!$entry) return;

                $entryId = $entry->id;
                $settings = $this->getSettings();

                if (!$settings->toolbarEnabled) return;
                if (!Craft::$app->user->checkPermission('author-toolbar:access-toolbar')) return;
                if (Craft::$app->request->isPreview) return;
                if (Craft::$app->request->isAjax) return;
                if (Craft::$app->request->isConsoleRequest) return;

                $script = <<<JS
                    document.addEventListener("DOMContentLoaded", async () => {
                        try {
                            const toolbarElement = await fetch("/actions/author-toolbar/toolbar/get-html?entryId={$entryId}");
                            const toolbarElementHtmlString = await toolbarElement.text();
                            
                            document.body.insertAdjacentHTML('beforeend', toolbarElementHtmlString);
                        } catch (error) {
                            console.error('Failed to load author toolbar:', error);
                        }
                    });
                JS;

                Craft::$app->view->registerHtml(Craft::$app->view->renderTemplate('author-toolbar/_windowObject.twig'), View::POS_HEAD);
                Craft::$app->getView()->registerJs($script, View::POS_HEAD);
            }
        );
    }
}

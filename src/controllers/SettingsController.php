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

namespace digitalastronaut\craftauthortoolbar\controllers;

use craft\web\Controller;

use yii\base\InvalidConfigException;

use yii\web\ForbiddenHttpException;
use yii\web\Response;

use digitalastronaut\craftauthortoolbar\AuthorToolbar;

/**
 * Class SettingsController
 *
 * @author      Digitalastronaut
 * @package     AuthorToolbar
 * @since       v1.0.0-beta
 */
class SettingsController extends Controller {
    public $defaultAction = 'index';
    protected array|int|bool $allowAnonymous = self::ALLOW_ANONYMOUS_NEVER;

    /**
     * @throws InvalidConfigException
     * @throws ForbiddenHttpException
     */
    public function actionIndex(): Response {
        $this->requirePermission('author-toolbar:edit-settings');

        $settings = AuthorToolbar::getInstance()->getSettings();
        
        return $this->renderTemplate('author-toolbar/_settings.twig', [
            'settings' => $settings
        ]);
    }
}
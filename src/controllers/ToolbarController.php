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

use craft\elements\Entry;
use craft\web\Controller;

use yii\base\InvalidConfigException;

use yii\web\ForbiddenHttpException;
use yii\web\Response;

use digitalastronaut\craftauthortoolbar\AuthorToolbar;

/**
 * Class ToolbarController
 *
 * @author      Digitalastronaut
 * @package     AuthorToolbar
 * @since       v1.0.0-beta
 */
class ToolbarController extends Controller {
    public $defaultAction = 'index';
    protected array|int|bool $allowAnonymous = self::ALLOW_ANONYMOUS_NEVER;

    /**
     * @throws InvalidConfigException
     * @throws ForbiddenHttpException
     */
    public function actionGetHtml(int $entryId): Response {
        $this->requirePermission('author-toolbar:access-toolbar');

        $entry = Entry::find()->id($entryId)->one();
        $settings = AuthorToolbar::getInstance()->getSettings();

        return $this->renderTemplate('author-toolbar/_toolbar.twig', [
            'entry' => $entry,
            'settings' => $settings
        ]);
     }
}
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

/**
 * Class SearchController
 *
 * @author      Digitalastronaut
 * @package     AuthorToolbar
 * @since       v1.0.0-beta
 */
class SearchController extends Controller {
    public $defaultAction = 'index';
    protected array|int|bool $allowAnonymous = self::ALLOW_ANONYMOUS_NEVER;

    /**
     * @throws InvalidConfigException
     * @throws ForbiddenHttpException
     */
    public function actionGetSearchResultsHtml(): Response {
        $this->requirePermission('author-toolbar:access-search-menu');

        return $this->renderTemplate('author-toolbar/requests/_search.twig');
    }
}
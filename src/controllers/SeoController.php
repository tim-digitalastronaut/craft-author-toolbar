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
use yii\web\MethodNotAllowedHttpException;
use yii\web\Response;

/**
 * Class SeoController
 *
 * @author      Digitalastronaut
 * @package     AuthorToolbar
 * @since       v1.0.0-beta
 */
class SeoController extends Controller {
    public $defaultAction = 'index';
    protected array|int|bool $allowAnonymous = self::ALLOW_ANONYMOUS_NEVER;

    /**
     * @throws InvalidConfigException
     * @throws ForbiddenHttpException
     * @throws MethodNotAllowedHttpException
     */
    public function actionGetChecklistHtml(): Response {
        $this->requirePermission('author-toolbar:access-seo-menu');
        $this->requirePostRequest();

        $body = $this->request->getBodyParams();

        return $this->renderTemplate('author-toolbar/requests/seo/_checklist.twig',
            ['checklist' => $body]
        );
    }

    /**
     * @throws InvalidConfigException
     * @throws ForbiddenHttpException
     * @throws MethodNotAllowedHttpException
     */
    public function actionGetSocialMediaPreviewsHtml(): Response {
        $this->requirePermission('author-toolbar:access-seo-menu');
        $this->requirePostRequest();

        $body = $this->request->getBodyParams();

        return $this->renderTemplate('author-toolbar/requests/seo/_socialMediaPreviews.twig', [
            'language' => $body['language'],
            'favicon' => $body['favicon'],
            'og' => $body['og'],
            'twitter' => $body['twitter']
        ]);
    }

    /**
     * @throws InvalidConfigException
     * @throws ForbiddenHttpException
     * @throws MethodNotAllowedHttpException
     */
    public function actionGetHeadingsOverviewHtml(): Response {
        $this->requirePermission('author-toolbar:access-seo-menu');
        $this->requirePostRequest();

        $body = $this->request->getBodyParams();

        return $this->renderTemplate('author-toolbar/requests/seo/_headingsOverview.twig',
            ['headings' => $body]
        );
    }

    /**
     * @throws InvalidConfigException
     * @throws ForbiddenHttpException
     * @throws MethodNotAllowedHttpException
     */
    public function actionGetImagesOverviewHtml(): Response {
        $this->requirePermission('author-toolbar:access-seo-menu');
        $this->requirePostRequest();

        $body = $this->request->getBodyParams();

        return $this->renderTemplate('author-toolbar/requests/seo/_imagesOverview.twig',
            ['imagesData' => $body]
        );
    }
}

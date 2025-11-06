<?php

namespace digitalastronaut\craftauthortoolbar\controllers;

use Craft;
use craft\web\Controller;
use yii\base\InvalidConfigException;
use yii\web\MethodNotAllowedHttpException;
use yii\web\Response;

class SeoController extends Controller {
    protected array|int|bool $allowAnonymous = true;

    /**
     * @throws InvalidConfigException
     * @throws MethodNotAllowedHttpException
     */
    public function actionGetChecklistHtml(): Response {
        $this->requirePostRequest();

        $body = $this->request->getBodyParams();

        return $this->renderTemplate('author-toolbar/requests/seo/_checklist.twig',
            ['checklist' => $body]
        );
    }

    /**
     * @throws InvalidConfigException
     * @throws MethodNotAllowedHttpException
     */
    public function actionGetSocialMediaPreviewsHtml(): Response {
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
     * @throws MethodNotAllowedHttpException
     */
    public function actionGetHeadingsOverviewHtml(): Response {
        $this->requirePostRequest();

        $body = $this->request->getBodyParams();

        return $this->renderTemplate('author-toolbar/requests/seo/_headingsOverview.twig',
            ['headings' => $body]
        );
    }

    /**
     * @throws InvalidConfigException
     * @throws MethodNotAllowedHttpException
     */
    public function actionGetImagesOverviewHtml(): Response {
        $this->requirePostRequest();

        $body = $this->request->getBodyParams();

        return $this->renderTemplate('author-toolbar/requests/seo/_imagesOverview.twig',
            ['imagesData' => $body]
        );
    }
}

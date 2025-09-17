<?php

namespace digitalastronaut\craftauthortoolbar\controllers;

use Craft;
use craft\web\Controller;
use yii\web\Response;

class SeoController extends Controller {
    public function actionPreviews(): Response {
        $this->requirePostRequest();

        $body = $this->request->getBodyParams();

        return $this->renderTemplate('author-toolbar/requests/_seoPreviews.twig', [
            'language' => $body['language'],
            'favicon' => $body['favicon'],
            'og' => $body['og'],
            'twitter' => $body['twitter']
        ]);
    }
}
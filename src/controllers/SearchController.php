<?php

namespace digitalastronaut\craftauthortoolbar\controllers;

use Craft;
use craft\web\Controller;
use yii\web\Response;

class SearchController extends Controller {
    protected array|int|bool $allowAnonymous = true;

    public function actionGetSearchResultsHtml(): Response {
        return $this->renderTemplate('author-toolbar/requests/_search.twig');
    }
}
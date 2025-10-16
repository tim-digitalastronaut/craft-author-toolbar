<?php

namespace digitalastronaut\craftauthortoolbar\controllers;

use Craft;
use craft\web\Controller;
use yii\web\Response;

use digitalastronaut\craftauthortoolbar\AuthorToolbar;

class SettingsController extends Controller {
    public function actionIndex(): Response {
        $this->requirePermission('authorToolbar-editSettings');

        $settings = AuthorToolbar::getInstance()->getSettings();
        
        return $this->renderTemplate('author-toolbar/_settings.twig', [
            'settings' => $settings
        ]);
    }
}
<?php

namespace digitalastronaut\craftauthortoolbar\services;

use Craft;
use craft\elements\Entry;
use yii\base\Component;
use digitalastronaut\craftauthortoolbar\AuthorToolbar;

class ToolbarService extends Component {    
    // public function getHtml() {
    //     $settings = AuthorToolbar::getInstance()->getSettings();
    //     $entry = Entry::find()->id(158)->one();

    //     return Craft::$app->getView()->renderTemplate('author-toolbar/_toolbar.twig', [
    //         'entry' => $entry,
    //         'settings' => $settings
    //     ]);
    // }
}
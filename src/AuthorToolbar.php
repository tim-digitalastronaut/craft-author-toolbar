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

use yii\web\Response;

use craft\base\Model;
use craft\base\Plugin;

use craft\helpers\UrlHelper;

use digitalastronaut\craftauthortoolbar\models\Settings;

/**
 * Class AuthorToolbar
 *
 * @author      Digitalastronaut
 * @package     AuthorToolbar
 * @since       v1.0.0-beta
 */
class AuthorToolbar extends Plugin {
    use PluginTrait;

    public bool $hasCpSettings = true;

    /**
     * @return void
     */
    public function init(): void {
        parent::init();

        $this->registerEvents();

        Craft::info(Craft::t('author-toolbar', '{name} plugin loaded', ['name' => $this->name]));
    }

    /**
     * @inheritDoc
     * @return Model|null
     */
    protected function createSettingsModel(): ?Model {
        return Craft::createObject(Settings::class);
    }

    /**
     * @inheritDoc
     * @return Response
     */
    public function getSettingsResponse(): mixed {
		return Craft::$app->controller->redirect(UrlHelper::cpUrl('author-toolbar/settings'));
	}
}

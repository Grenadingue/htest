# User guide

## Views
### Panels
The panels are available on every single page of the website.

![panels](./images/panels.png)

#### Top panel
On the top left corner, a click on `htest` will redirect you to the [dashboard](#dashboard).

#### Side panel
You will find here three different buttons, [`Dashboard`](#dashboard), [`Test trees library`](#test-trees-library) and [`Machines tests`](#machines-tests). A click on one of these buttons will redirect you to the associated page.

### Dashboard
All dashboard data is currently fake, and does not have any real link with the project's content.

### Test trees library
#### Display tree families
The first time you reach the test trees library you will face an empty library.

![empty test trees library](./images/empty_test_trees_library.png)

#### Add new tree family
To add a new tree family in the library, click the `Create tree family` button.

![create tree family button](./images/create_tree_family_button.png)

You will now face the `Create tree family` view.

![create tree family view](./images/create_tree_family_view.png)

Fill the `Tree family's name` field with the desired family name. Look at the validation status field.

![fill tree family name](./images/create_tree_family_name.png)

Now we will send the content of the first tree to the server. *Wtf are you talking about? See [`Test tree format documentation`](#test-trees-format)*. Click on the `Choose file` button.

![create tree family choose file](./images/create_tree_family_choose_file_button.png)

Select the tree you want to use.

![create tree family select file](./images/create_tree_family_choose_file.png)

The file will be sent to the server, which will instantly validate or reject it, depending on its content validity. Errors or success messages will appear in the validation status field.

![create tree family validation failure](./images/create_tree_family_file_validation_failure.png)

![create tree family validation success](./images/create_tree_family_file_validation_success.png)

Once every validation field reaches a successfull state, you can click on the `Submit` button.

![submit tree family](./images/create_tree_family_submit.png)

If everything goes well, you will reach the `Test trees library` page, the same as when you click on the button `Test trees library` on the left panel, but this time we can find the previously added tree family in a list.

![first tree family](./images/tree_families_first_family.png)

#### Tree families actions

You can see tree different buttons associated with the tree family, `View`, `Update` and `Delete`.

![tree family actions](./images/tree_families_family_actions.png)

A click on the `View` button will bring you to the family details view. More details on the tree family view [here](#tree-family-view). To get back of this page, use the left panel to click on `Test tree library`.

![first tree family view](./images/first_tree_family_view.png)

A click on the `Update` button will bring you to the family update view. More details on the tree family update view [here](#tree-family-update-view). To get back of this page, use the left panel to click on `Test tree library`.

![first tree family update view](./images/tree_family_update_view.png)

A click on the `Delete` button will delete the whole family. Be careful there is no confirmation message before deletion!

#### Tree family view
On a tree family view you are able to see all trees contained in a tree family, here `foohoohaha` family contains `super tree`.

![first tree family view](./images/first_tree_family_view.png)

You can see three different kinds of buttons associated with the family and its trees, `Add version`, `View` and `Delete`.

![tree family view buttons](./images/tree_family_view_buttons.png)

The `Add version` button will redirect you to the [tree family update view](#tree-family-update-view), the same view which is reachable from the tree families view, through the `Update` button.

![first tree family update view](./images/tree_family_update_view.png)

A click on the `View` button will give you access to a raw view of the tree's data.

![raw tree view](./images/tree_raw_view.png)

A click on the `Delete` button will delete the desired tree. Be careful there is no confirmation message before deletion!

#### Tree family update view
Here we face the tree family update view. This view goal is to let you add a new tree inside an existing family.

![first tree family update view](./images/tree_family_update_view.png)

We can break this view into two main components, the parent selector (`Select tree family`) and the updater (`Update tree family`).

![tree family update view main components](./images/update_tree_family_main_components.png)

The selection of a parent family and its version is mandatory to unlock the `Update tree family` fields. Lets select the tree family we will use as a parent.

![tree family update view parent family selector](./images/update_tree_family_select_parent_family.png)

Then we select a tree version. Note that even if the parent tree version selection is mandatory, it only gives you an access to download the selected tree. It does not impact how the selected tree version will be linked to the new added one.

![tree family update view parent tree selector](./images/update_tree_family_select_parent_tree.png)

Once we have selected a family and a tree inside of the family, we may want to download the selected tree. For that, just click the `Download` button.

![tree family update view download parent button](./images/update_tree_family_download_parent_button.png)

Then download the tree as a `.json` file in your computer. *Wait, wtf am I supposed to do with that? See [`Test tree format documentation`](#test-trees-format)*

![tree family update view download parent](./images/update_tree_family_download_parent.png)

Once we have passed the parent selection, the updater fields are now unlocked. Now we can upload a new tree in the family. The upload, validation and submission fields work the same way than the [`Create tree family` view](#add-new-tree-family). *For more details about the tree format, see [`Test tree format documentation`](#test-trees-format)*.

![update tree family](./images/update_tree_family.png)

After a successfull submission, you will be redirected to the [`Tree family view`](#tree-family-view), were you can see the newly added list appearing in the list.

![tree family view with second tree](./images/first_tree_family_view_with_second_tree.png)

### Machines tests
The machines tests page is not implemented, you cannot use it right now.

## Test trees format
Foobar

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
Foo

#### Tree family update view
Bar

### Machines tests
The machines tests page is not implemented, you cannot use it right now.

## Test trees format
Foobar

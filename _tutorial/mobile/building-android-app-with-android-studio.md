---
layout: tutorial
key: tutorial
title: "Building Android App with Android Studio"
index: 8522
subcategory: mobile
date: 2017-07-16
tags: [Android, Android Studio, SQLite]
---

> Tutorial for how to develop Android App with Android Studio on Mac.

Build a simple product management app called GameStore. This app shows a list of products, including a product name, price, and photo. User can add, remove, or edit a product. To add a new product or edit an existing one, users navigate to a different screen where they can specify a name, price, and photo for a particular product.

## 1. Prerequisite
### 1.1 JDK and Android Studio Installed
Refer to [Setting up Android Development Environment on Mac]({% link _tutorial/mobile/setting-up-android-development-environment-on-mac.md %}) to install JDK and Android Studio on Mac.
### 1.2 Android Emulator Installed
Android Emulator will be installed along with Android Studio. You can also use third-party emulator, like Genymotion.

## 2. Creating New Project
In Android Studio, 'Start a new Android Studio project'.
![image](/assets/images/mobile/8522/welcome.png){:width="700px"}  
In the dialog that appears, use the following values for your project and select a location to save your project, Next.
* Application name: Game Store Android
* Company domain: tutorial.johnny

![image](/assets/images/mobile/8522/createnewproject.png){:width="700px"}  
Select 'API 15' as the minimum SDK for target devices, Next.
![image](/assets/images/mobile/8522/targetdevice.png){:width="700px"}  
Select 'Empty Activity', Next.
![image](/assets/images/mobile/8522/emptyactivity.png){:width="700px"}  
Keep the default values unchanged, Next.
![image](/assets/images/mobile/8522/configureactivity.png){:width="700px"}  
Project is created.
![image](/assets/images/mobile/8522/androidstudio.png)  

## 3. Updating Project
### 3.1 Product List View
In Android Studio, rename 'activity_main.xml' to 'activity_product_list.xml'. Edit `activity_product_list.xml`to add the following content.
```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="johnny.tutorial.gamestoreandroid.ProductListActivity">

    <ListView
        android:id="@+id/list_product"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"/>

</android.support.constraint.ConstraintLayout>
```
In Android Studio, create a new activity named `product_list_item.xml` with following content.
```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="fill_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal">
    <CheckBox
        android:id="@+id/checkbox"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:checked="false"
        android:layout_margin="4dp"
        android:paddingTop="30dp"
        android:paddingLeft="30dp"
        android:paddingRight="0dp"
        android:paddingBottom="30dp"/>
    <ImageView
        android:id="@+id/image"
        android:layout_width="80dp"
        android:layout_height="80dp"
        android:layout_margin="4dp"/>
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:layout_margin="4dp">
        <TextView
            android:id="@+id/productname"
            android:textSize="20sp"
            android:textStyle="bold"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"/>
        <TextView
            android:id="@+id/price"
            android:textSize="20sp"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"/>
    </LinearLayout>
</LinearLayout>
```
Rename 'MainActivity.java' to `ProductListActivity.java`. Edit it with following content. Notice, we create a customized adapter `ProductAdapter` for this activity.
```java
package johnny.tutorial.gamestoreandroid;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.ListAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import johnny.tutorial.gamestoreandroid.constant.GameStoreConstants.ViewMode;
import johnny.tutorial.gamestoreandroid.db.ProductDbHelper;
import johnny.tutorial.gamestoreandroid.model.Product;

import java.util.ArrayList;

import johnny.tutorial.gamestoreandroid.constant.GameStoreConstants;

public class ProductListActivity extends AppCompatActivity {

    private static final String TAG = "ProductListActivity";
    private ProductDbHelper mHelper;
    private ListView mListView;
    private ListAdapter mAdapter;
    private ViewMode mMode;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_list);

        mMode = ViewMode.Display;
        mHelper = new ProductDbHelper(this);
        mListView = (ListView) findViewById(R.id.list_product);

        updateUI();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        if (mMode == ViewMode.Display) {
            getMenuInflater().inflate(R.menu.list_menu, menu);
            return super.onCreateOptionsMenu(menu);
        } else {
            getMenuInflater().inflate(R.menu.edit_menu, menu);
            return super.onCreateOptionsMenu(menu);
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_addproduct:
                Log.d(TAG, "Add a new product");
                Intent intent = new Intent(this, ProductDetailActivity.class);
                intent.putExtra(GameStoreConstants.ParamAction, GameStoreConstants.ParamActionAdd);
                this.startActivity(intent);
                return true;
            case R.id.action_editproduct:
                Log.d(TAG, "Switch to Edit mode");
                mMode = ViewMode.Edit;
                updateUI();
                return true;
            case R.id.action_delete:
                Log.d(TAG, "Delete selected products");
                if (DeleteSelectedItems() == false) {
                    Toast.makeText(this, "Select at least one item to delete", Toast.LENGTH_LONG).show();
                    return false;
                }
                mMode = ViewMode.Display;
                updateUI();
                return true;
            case R.id.action_cancel:
                Log.d(TAG, "Cancel edit");
                mMode = ViewMode.Display;
                updateUI();
                return true;

            default:
                return super.onOptionsItemSelected(item);
        }
    }

    // Product Adapter
    private class ProductAdapter extends BaseAdapter {
        private Context context;
        private int resource;
        private ArrayList<Product> productList;
        private ViewMode mode;
        private LayoutInflater inflater;

        ProductAdapter(Context context, int resource, ArrayList<Product> productList, ViewMode mode) {
            this.context = context;
            this.resource = resource;
            this.productList = productList;
            this.mode = mode;
            this.inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        }

        @Override
        public int getCount() {
            return productList.size();
        }

        @Override
        public Object getItem(int i) {
            return productList.get(i);
        }

        @Override
        public long getItemId(int i) {
            return i;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {
            ViewHolder holder;
            View row = convertView;
            if (row == null) {
                row = inflater.inflate(this.resource, parent, false);
                holder = new ViewHolder();
                holder.productname = (TextView) row.findViewById(R.id.productname);
                holder.price = (TextView) row.findViewById(R.id.price);
                holder.image = (ImageView) row.findViewById(R.id.image);
                holder.checkbox = (CheckBox) row.findViewById(R.id.checkbox);
                row.setTag(holder);
            } else {
                holder = (ViewHolder) row.getTag();
            }

            Product product = productList.get(position);
            holder.id = product.getProductId();
            holder.productname.setText(product.getProductName());
            holder.price.setText("$" + String.valueOf(product.getPrice()));
            holder.image.setImageBitmap(product.getImage());
            if (mode == ViewMode.Display) {
                holder.checkbox.setVisibility(View.GONE);
            } else {
                holder.checkbox.setVisibility(View.VISIBLE);
            }
            row.setOnClickListener(new ProductItemOnClickListener(context, product.getProductId()));
            return row;
        }

        class ViewHolder {
            int id;
            TextView productname;
            TextView price;
            ImageView image;
            CheckBox checkbox;
        }

    }

    private class ProductItemOnClickListener implements View.OnClickListener {
        private Context context;
        private int id;

        public ProductItemOnClickListener(Context context, int id) {
            this.context = context;
            this.id = id;
        }

        @Override
        public void onClick(View view) {
            Intent intent = new Intent(this.context, ProductDetailActivity.class);
            intent.putExtra(GameStoreConstants.ParamAction, GameStoreConstants.ParamActionEdit);
            intent.putExtra(GameStoreConstants.ParamId, id);
            this.context.startActivity(intent);
        }
    }

    private void updateUI() {
        ArrayList<Product> productList = mHelper.getAllProducts();
        if (productList.size() == 0) {
            productList = createDummyData();
        }

        mAdapter = new ProductAdapter(this, R.layout.product_list_item, productList, mMode);
        mListView.setAdapter(mAdapter);
        invalidateOptionsMenu();
    }

    private Boolean DeleteSelectedItems() {
        boolean isSelected = false;
        for (int i = 0; i < mListView.getCount(); i++) {
            View rowView = mListView.getChildAt(i);
            CheckBox cb = (CheckBox) rowView.findViewById(R.id.checkbox);
            if (cb.isChecked()) {
                isSelected = true;
                ProductAdapter.ViewHolder holder = (ProductAdapter.ViewHolder) rowView.getTag();
                mHelper.deleteProduct(holder.id);
            }
        }
        return isSelected;
    }

    private ArrayList<Product> createDummyData() {
        Bitmap image1 = BitmapFactory.decodeResource(getResources(), R.drawable.xbox360);
        mHelper.insertProduct("xbox360", 299.00, image1);
        Bitmap image2 = BitmapFactory.decodeResource(getResources(), R.drawable.wii);
        mHelper.insertProduct("wii", 269.00, image2);
        Bitmap image3 = BitmapFactory.decodeResource(getResources(), R.drawable.controller);
        mHelper.insertProduct("controller", 19.99, image3);
        return mHelper.getAllProducts();
    }
}
```
### 3.2 Product Detail View
Create another activity named `activity_product_detail` with following content.
```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="johnny.tutorial.gamestoreandroid.ProductDetailActivity">
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
        android:orientation="vertical"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_margin="10dp">
        <EditText
            android:id="@+id/productname"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:hint="@string/hint_product_name"
            android:inputType="text" />
        <EditText
            android:id="@+id/price"
            android:layout_width="fill_parent"
            android:layout_height="wrap_content"
            android:hint="@string/hint_product_price"
            android:inputType="numberDecimal" />
        <Button
            android:id="@+id/loadimage"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:text="@string/button_load_image"
            android:layout_marginTop="10dp"
            android:layout_marginLeft="10dp"
            android:layout_marginRight="10dp"
            android:layout_marginBottom="30dp" />
        <ImageView
            android:id="@+id/image"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:layout_margin="4dp"
            android:visibility="invisible" />
    </LinearLayout>
</android.support.constraint.ConstraintLayout>
```
Edit `ProductDetailActivity.java` with following content.
```java
package johnny.tutorial.gamestoreandroid;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import java.io.FileNotFoundException;

import johnny.tutorial.gamestoreandroid.constant.GameStoreConstants;
import johnny.tutorial.gamestoreandroid.constant.GameStoreConstants.ActionMode;
import johnny.tutorial.gamestoreandroid.db.ProductDbHelper;
import johnny.tutorial.gamestoreandroid.model.Product;

public class ProductDetailActivity extends AppCompatActivity {
    private static final String TAG = "ProductDetailActivity";
    private ProductDbHelper mHelper;
    private Product mProduct;
    private ActionMode mAction;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_detail);

        mHelper = new ProductDbHelper(this);

        Bundle extras = getIntent().getExtras();
        String actionText = extras.getString(GameStoreConstants.ParamAction);

        EditText name = (EditText) this.findViewById(R.id.productname);
        EditText price = (EditText) this.findViewById(R.id.price);
        Button loadImage = (Button)findViewById(R.id.loadimage);
        ImageView image = (ImageView) this.findViewById(R.id.image);

        if (actionText.equalsIgnoreCase(GameStoreConstants.ParamActionAdd)) {
            mAction = ActionMode.Add;
        } else if (actionText.equalsIgnoreCase(GameStoreConstants.ParamActionEdit)) {
            mAction = ActionMode.Edit;
            int id = extras.getInt(GameStoreConstants.ParamId);
            mProduct = mHelper.getProduct(id);
            if (mProduct != null) {
                name.setText(mProduct.getProductName());
                price.setText(String.valueOf(mProduct.getPrice()));
                image.setImageBitmap(mProduct.getImage());
                Drawable drawable = new BitmapDrawable(getResources(), mProduct.getImage());
                loadImage.setBackground(drawable);
                loadImage.setText("");
            }
        }

        loadImage.setOnClickListener(new Button.OnClickListener(){
            @Override
            public void onClick(View arg0) {
            Intent intent = new Intent(Intent.ACTION_PICK,
                    android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
            startActivityForResult(intent, 0);
        }});
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.detail_menu, menu);
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // dismiss soft keyboard
        AndroidUtils.hideKeyboard(this);

        switch (item.getItemId()) {
            case R.id.action_save:
                Log.d(TAG, "Save product");
                EditText name = (EditText) this.findViewById(R.id.productname);
                EditText price = (EditText) this.findViewById(R.id.price);
                Button loadImage = (Button)findViewById(R.id.loadimage);
                ImageView image = (ImageView) this.findViewById(R.id.image);

                String textName = name.getText().toString();
                String textPrice = price.getText().toString();
                Drawable drawable = image.getDrawable();

                if(TextUtils.isEmpty(textName)){
                    Toast.makeText(this, "Product Name is Empty", Toast.LENGTH_LONG).show();
                    name.requestFocus();
                    return false;
                }
                if(TextUtils.isEmpty(textPrice)){
                    Toast.makeText(this, "Price is Empty", Toast.LENGTH_LONG).show();
                    price.requestFocus();
                    return false;
                }
                if (drawable == null) {
                    Toast.makeText(this, "Choose a image", Toast.LENGTH_LONG).show();
                    loadImage.setFocusable(true);
                    loadImage.setFocusableInTouchMode(true); ///add this line
                    loadImage.requestFocus();
                    return false;
                }

                if (mAction == ActionMode.Add) {
                    mHelper.insertProduct(textName, Double.parseDouble(textPrice), ((BitmapDrawable)drawable).getBitmap());
                } else {
                    mHelper.updateProduct(mProduct.getProductId(), textName, Double.parseDouble(textPrice), ((BitmapDrawable)drawable).getBitmap());
                }
                Intent intent = new Intent(this, ProductListActivity.class);
                this.startActivity(intent);
                return true;

            default:
                return super.onOptionsItemSelected(item);
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (resultCode == RESULT_OK){
            Uri targetUri = data.getData();
            try {
                Bitmap bitmap = BitmapFactory.decodeStream(getContentResolver().openInputStream(targetUri));
                ImageView targetImage = (ImageView)findViewById(R.id.image);
                targetImage.setImageBitmap(bitmap);
                Button loadImage = (Button)findViewById(R.id.loadimage);
                Drawable drawable = new BitmapDrawable(getResources(), bitmap);
                loadImage.setBackground(drawable);
                loadImage.setText("");
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }
        }
    }
}
```
### 3.3 Menu
To switch the views between product list and product detail, we need to create two menus. Create menu named `list_menu.xml` with following content. Two menu items, `Add` and `Edit`.
```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    <item
        android:id="@+id/action_addproduct"
        android:title="@string/menu_add"
        android:iconTint="@color/colorWhite"
        app:showAsAction="always" />
    <item
        android:id="@+id/action_editproduct"
        android:title="@string/menu_edit"
        android:iconTint="@color/colorWhite"
        app:showAsAction="always" />
</menu>
```
Create menu named `detail_menu.xml` with following content. One menu item, `Save`. It will be used for product creation and updating.
```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    <item
        android:id="@+id/action_save"
        android:title="@string/menu_save"
        app:showAsAction="always" />
</menu>
```
To switch the view between Display mode and Edit mode in product list, we need to create another menu named `edit_menu.xml`.
```xml
<?xml version="1.0" encoding="utf-8"?>
<menu xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    <item
        android:id="@+id/action_delete"
        android:title="@string/menu_delete"
        android:iconTint="@color/colorWhite"
        app:showAsAction="always" />
    <item
        android:id="@+id/action_cancel"
        android:title="@string/menu_back"
        android:iconTint="@color/colorWhite"
        app:showAsAction="always" />
</menu>
```
### 3.4 Product Model
Create package named `johnny.tutorial.gamestoreandroid.model` and create `Product` class with following content.
```java
package johnny.tutorial.gamestoreandroid.model;

import android.graphics.Bitmap;

public class Product {
    private int productid;
    private String productname;
    private double price;
    private Bitmap image;

    public Product() {}

    public Product(int productid, String productname, double price, Bitmap image) {
        this.productid = productid;
        this.productname = productname;
        this.price = price;
        this.image = image;
    }

    public int getProductId() {
        return productid;
    }
    public void setProductId(int productid) {
        this.productid = productid;
    }

    public String getProductName() {
        return productname;
    }
    public void setProductName(String productname) {
        this.productname = productname;
    }

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }

    public Bitmap getImage() {
        return image;
    }
    public void setImage(Bitmap image) {
        this.image = image;
    }
}
```
### 3.5 Persisting Data with SQLite
Create package named `johnny.tutorial.gamestoreandroid.db` and create class named `ProductContract` with following content. 'ProductContract' defines the database schema. Table `products` has four columns.
```java
package johnny.tutorial.gamestoreandroid.db;

import android.provider.BaseColumns;

public class ProductContract {
    public static final String DB_NAME = "johnny.tutorial.gamestoreandroid.db";
    public static final int DB_VERSION = 1;

    public class ProductEntry implements BaseColumns {
        public static final String TABLE = "products";
        public static final String COL_PRODUCT_NAME = "productname";
        public static final String COL_PRICE = "price";
        public static final String COL_IMAGE = "image";
    }
}
```
Create another class named `ProductDbHelper` under package `johnny.tutorial.gamestoreandroid.db`. 'ProductDbHelper' defines CRUD operation methods for table `products`. Notice the type mapping between java and SQLite, Double <-> REAL and Bitmap <-> BLOB.
```java
package johnny.tutorial.gamestoreandroid.db;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.DatabaseUtils;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.database.sqlite.SQLiteStatement;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import johnny.tutorial.gamestoreandroid.model.Product;

public class ProductDbHelper extends SQLiteOpenHelper {

    public ProductDbHelper(Context context) {
        super(context, ProductContract.DB_NAME, null, ProductContract.DB_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String createTable = "CREATE TABLE " + ProductContract.ProductEntry.TABLE + " ( " +
                ProductContract.ProductEntry._ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
                ProductContract.ProductEntry.COL_PRODUCT_NAME + " TEXT NOT NULL, " +
                ProductContract.ProductEntry.COL_PRICE + " REAL," +
                ProductContract.ProductEntry.COL_IMAGE + " BLOB);";

        db.execSQL(createTable);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS " + ProductContract.ProductEntry.TABLE);
        onCreate(db);
    }

    public boolean insertProduct (String name, Double price, Bitmap image) {
        SQLiteDatabase db = this.getWritableDatabase();
        String sql = "INSERT INTO " + ProductContract.ProductEntry.TABLE + " ("+ProductContract.ProductEntry.COL_PRODUCT_NAME+","+
                ProductContract.ProductEntry.COL_PRICE + "," +
                ProductContract.ProductEntry.COL_IMAGE + ") VALUES(?,?,?)";
        SQLiteStatement insertStmt = db.compileStatement(sql);
        insertStmt.clearBindings();
        insertStmt.bindString(1, name);
        insertStmt.bindDouble(2,price);
        insertStmt.bindBlob(3, getBitmapAsByteArray(image));
        insertStmt.executeInsert();
        db.close();
        return true;
    }

    public boolean updateProduct (Integer id, String name, Double price, Bitmap image) {
        SQLiteDatabase db = this.getWritableDatabase();
        String sql = "UPDATE " + ProductContract.ProductEntry.TABLE + " SET "+ProductContract.ProductEntry.COL_PRODUCT_NAME+"=?,"+
                ProductContract.ProductEntry.COL_PRICE + "=?," +
                ProductContract.ProductEntry.COL_IMAGE + "=? WHERE _id=?";
        SQLiteStatement updateStmt = db.compileStatement(sql);
        updateStmt.clearBindings();
        updateStmt.bindString(1, name);
        updateStmt.bindDouble(2,price);
        updateStmt.bindBlob(3, getBitmapAsByteArray(image));
        updateStmt.bindLong(4, id);
        updateStmt.executeUpdateDelete();
        db.close();
        return true;
    }

    public Integer deleteProduct (Integer id) {
        SQLiteDatabase db = this.getWritableDatabase();
        return db.delete(ProductContract.ProductEntry.TABLE,
                "_id = ? ", new String[]{Integer.toString(id)});
    }

    public Product getProduct(int id) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor rs =  db.rawQuery( "SELECT * FROM " + ProductContract.ProductEntry.TABLE + " WHERE _id="+id+"", null );
        rs.moveToFirst();
        if (rs.isAfterLast()) {
            return null;
        }
        Product product = new Product();
        product.setProductId(rs.getInt(rs.getColumnIndex(ProductContract.ProductEntry._ID)));
        product.setProductName(rs.getString(rs.getColumnIndex(ProductContract.ProductEntry.COL_PRODUCT_NAME)));
        product.setPrice(rs.getDouble(rs.getColumnIndex(ProductContract.ProductEntry.COL_PRICE)));
        byte[] imgByte = rs.getBlob(rs.getColumnIndex(ProductContract.ProductEntry.COL_IMAGE));
        product.setImage(BitmapFactory.decodeByteArray(imgByte, 0, imgByte.length));
        if (!rs.isClosed()) {
            rs.close();
        }
        return product;
    }

    public ArrayList<Product> getAllProducts() {
        ArrayList<Product> list = new ArrayList<Product>();

        SQLiteDatabase db = this.getReadableDatabase();
        Cursor rs =  db.rawQuery( "SELECT * FROM " + ProductContract.ProductEntry.TABLE, null );
        rs.moveToFirst();

        while(rs.isAfterLast() == false){
            Product product = new Product();
            product.setProductId(rs.getInt(rs.getColumnIndex(ProductContract.ProductEntry._ID)));
            product.setProductName(rs.getString(rs.getColumnIndex(ProductContract.ProductEntry.COL_PRODUCT_NAME)));
            product.setPrice(rs.getDouble(rs.getColumnIndex(ProductContract.ProductEntry.COL_PRICE)));
            byte[] imgByte = rs.getBlob(rs.getColumnIndex(ProductContract.ProductEntry.COL_IMAGE));
            product.setImage(BitmapFactory.decodeByteArray(imgByte, 0, imgByte.length));
            list.add(product);
            rs.moveToNext();
        }
        if (!rs.isClosed())  {
            rs.close();
        }

        return list;
    }

    public int numberOfRows(){
        SQLiteDatabase db = this.getReadableDatabase();
        int numRows = (int) DatabaseUtils.queryNumEntries(db, ProductContract.ProductEntry.TABLE);
        return numRows;
    }

    private byte[] getBitmapAsByteArray(Bitmap bitmap) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 0, outputStream);
        return outputStream.toByteArray();
    }
}
```
### 3.6 Strings
Edit `strings.xml` with following content.
```xml
<resources>
    <string name="app_name">Game Store Android</string>
    <string name="title_product_detail">Product Detail</string>
    <string name="menu_add">Add</string>
    <string name="menu_edit">Edit</string>
    <string name="menu_delete">Delete</string>
    <string name="menu_back">Back</string>
    <string name="menu_save">Save</string>
    <string name="button_load_image">Tap to choose image</string>
    <string name="hint_product_name">Product Name</string>
    <string name="hint_product_price">Product Price</string>
</resources>
```
### 3.7 Permission for Accessing Photo
Add following settings to `AndroidManifest.xml`.
```xml
<uses-permission android:name="android.permission.MANAGE_DOCUMENTS" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

## 4. Testing in Emulator
### 4.1 Adding Images into Android Emulator Gallery
When creating or editing product, we need to access the photo gallery. By default, there is no phone in the Android emulator. You can send any file into it via drag-and-drop action. And then go to Settings -> Storage and re-mount the sdcard.
![image](/assets/images/mobile/8522/sdcard.png){:width="400px"}  
### 4.2 Running App
In Android Studio, Run -> Run 'app'. App is running in Android emulator.
![image](/assets/images/mobile/8522/emulator.png){:width="500px"}  
Product list.
![image](/assets/images/mobile/8522/runproductlist.png){:width="350px"}  
Edit product.
![image](/assets/images/mobile/8522/runproductedit.png){:width="350px"}  
Delete product in Edit mode. Select the items first and click 'Delete' button.
![image](/assets/images/mobile/8522/runproductdelete.png){:width="350px"}  
Add product.
![image](/assets/images/mobile/8522/runproductadd.png){:width="350px"}  
Tap to choose image from gallery for the product.
![image](/assets/images/mobile/8522/runchooseimage.png){:width="350px"}  
Image is loaded.
![image](/assets/images/mobile/8522/runimageloaded.png){:width="350px"}  
In landscape view.
![image](/assets/images/mobile/8522/runlandscape.png){:width="700px"}  

## 5. Source Files
* [Source files of Game Store(Android) on Github](https://github.com/jojozhuang/game-store-android)

## 6. References
* [Starting Android Development, Creating a Todo App](https://www.sitepoint.com/starting-android-development-creating-todo-app/)
* [Source Code](https://github.com/sitepoint-editors/TodoList)
* [Android Tutorial](https://www.tutorialspoint.com/android/index.htm)
* [Android - SQLite Database](https://www.tutorialspoint.com/android/android_sqlite_database.htm)
* [ListView Tutorial— Android #12](https://appsandbiscuits.com/listview-tutorial-android-12-ccef4ead27cc)
* [Add image into android emulator gallery](https://stackoverflow.com/questions/40681200/add-image-into-android-emulator-gallery)

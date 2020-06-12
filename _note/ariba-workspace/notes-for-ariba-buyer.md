---
layout: tutorial
key: note
title: "Notes for Ariba Buyer"
index: 9209
subcategory: ariba-workspace
date: 2020-06-05
tags: [Ariba, Notes]
---

> Ariba Buyer Setup.

## 0. Terminologies
* P table/Parameter Table, located at /ssp_git/root/install/config/Parameters.table

## 1. Errors/Issues
### 1.1 AribaNetworkId Issue
Invoice is stuck in "CC to AN" status, below error is seen in the history.
```raw
Failure to send Copy Request.ANERR-20000000000000000199274294:
Error:No relationship with Supplier, name:Ariba Network -- Arjun Chandra ANId:AN12000000261.
Please contact support with the Error Reference Number: ANERR-20000000000000000199274294 for more details.
```
This issue happens after running Junit, the ANID is changed for JCN upplier. To fix it, we need to change back the correct ANID for JCN supplier, see the steps below.  
1) Go to inspector, search `supplier location` which has Contact Id = 63(0000000100 in SAP realm).  
2) Set AribaNetworkId = `AN70000000004`.

### 1.2 “Add Non-Catalog Item” Button Disappears
Solution: remove role “No Ad-hoc Item” from the user ghalas.

Role permission check.
```java
ARCCatalogHomePage.showNonCatButton()->ARCCatalogSearchFullPage.hasNonCatalogTab()
->ARCCatalogSearchTab.hasNonCatalogTab()
```
Has no permission of "NoNonCatalogItems", see AQL below.
```sql
select distinct grp.UniqueName
from ariba.user.core.Group grp
join ariba.user.core.Role r using grp.Roles
left outer join ariba.user.core.Permission rolePerm using r.Permissions
left outer join ariba.user.core.Permission grpPerm using grp.Permissions
where
rolePerm.UniqueName in (
'NoNonCatalogItems'
) or
grpPerm.UniqueName in (
'NoNonCatalogItems'
)
order by grp.UniqueName
```

### 1.3 AN Invoice not reaching to local buyer
If AN invoice is not reaching to local buyer, it may because of the signature verification. Turn on feature `PS-925` to fix the issue.

### 1.4 Signature Verification Failed error from AN to P2P
```raw
Mon Oct 21 10:25:02 PDT 2019 (T71:prealm_2:*:*:wcn0en:buyerserver1) (util:WARN) [ID2811]:
Assert failed: Required child element xades:SignaturePolicyImplied does not exist
ariba.util.xmlsignature.XMLSignatureFeatures.SignaturePolicyIdSupport
```
Solution: Enable feature `PL-12387`- Xades support for SignaturePolicyId.
* https://product-jira.ariba.com/browse/PL-12387

## 2. Inspector
Inspector is a developer tool for buyer build.
### 2.1 Find and run schedule task in inspector
Click link ‘scheduledtask’, select partition ‘none’, click ‘Run a task’ button. Select task name, and submit.

### 2.2 How to find the validity for any field?
Inspector->Meta data: choose class-> show properties, search validity

For example, ariba.tax.core.TaxInfo, show properties->TaxCode, search validity, see the condition class ValidTaxInfo.

## 3. Knowledge
### 3.1 Create release contract
1) Create contract Request, set ‘Release Required’ to Yes.  
2) Add one Catalog item, note the Supplier Part Number, eg. NEWHEIRARCHYabc191.  
3) Save and submit the contract request, make it approved. The contract should be generated.  
4) Create requisition, input supplier part number in the search box, search.  
5) Choose one item to cart and create requisition. The contract number will be there.  
6) Submit, order should be created, eg C84-R1.  
7) Create PO-based invoice for this order.  

### 3.2 Steps to create service item
Pre-requistes: (refer to test case: INV-7698)  
1) Login to Supplier manager -> Site Manager -> Customer Sites -> Any sg realm -> Category Definition Manager -> Category Definitions  
2) Create a new category and provide all relevant info like supplier (JCN Technologies) etc.  
3) Add a new item /service to the category  
4) Validate the new category.  
5) Activate the category. The status would show as 'Activated'  
6) Go to Generated Subscriptions  
7) The created category would be in 'Activating' status  
8) Go to Catalog Manager -> Index Builder. It will show 1 subscription pending  
9) Wait for 10-15 min  
10) Category Definition Manager -> Generated Subscriptions. The status of your request would be 'Activated'  

### 3.3 Use ERPOrder
Set Parameter Application.Procure.OrderMethods, move up `SAPPOERPCC` and `SAPPOERP` to top.
And set `Application.Procure.PullAckFromERP` to No.

### 3.4 How to create Cancel Invoice Request?
In cXML, just change the operation from ‘new’ to ‘delete’.

### 3.5 Receipt by Amount on Purchase Order
Need to configure Receiving Type for particular Commodity Code.  
Go to Service Manager-> Procure-to-Pay Manager-> Receiving Types By Commodity Codes -> Create.
* Commodity Code: 4223.
* Receiving Type: Manual receipt – receive by amount.

### 3.6 Create ICS/PDR invoice. (SINV-7981)
Two approaches:
* Selenium script: Inv-4475-Validate_unKnowSupplierAddress.csv
* Test Center-> Post Failed Invoice PDRCXML
```sh
internal/zzzpdr/pdr.xml
internal/zzzpdr/ICSPOInvoice.xml
internal/zzzpdr/dummy.pdf
pdfAttachmentCid=testpdf,cxmlAttachmentCid=invoicecxml,invoice-id=sinv-7981
```
See the template in SINV-7981. Change the ANID and OrderID in the xml.

### 3.7 Create new supplier(AN02000600842, AN02000601520 @Dev13)
1) Go to [Dev 6 Test Central](https://svcdev6.ariba.com/Supplier.aw/ad/testCentral) or [Dev 13 Test Central](https://svcdev13.lab1.ariba.com/Supplier.aw/ad/testCentral), run the following stagers  
Create Test Supplier ( need to enter supplier User ID, name etc.)  
2) Login as the new supplier, Click drop down button at the right side of ‘Company Setting’->My Account, select ‘English’ for Preferred Language, “US/Pacific” for Preferred Timezone, and maintain meaningful first name and last name.  
3) Login as buyer in AN, setup relationship with the new supplier.  
4) Create the supplier in buyer to map the supplier in AN
 * Service Manager-> Sg realm->Supplier Manager->Supplier->New
 * Supplier->General(Only fill out the fields in the red rectangle)
 * Supplier->Partitioned Supplier->New Partitioned Supplier->Profile(Only fill out the fields in the red rectangle). In SAP realm, maintain purchase Orgs, otherwise, this supplier won’t be shown in the supplier chooser when create requisition.
 * Partitioned Supplier->Supplier Locations->Create New(Only fill out the fields in the red rectangle)
 * Ariba Networkd Id, here is the ANID for new supplier(RongSupplierDev13) in AN, AN02000600842.
 * Preferred Ordering Method: Electronic Ordering
maintain email in supplier address.

### 3.8 Logging for getInvalidField()
* fieldValidationTime
* fieldValidationTimeSummary

### 3.9 Perflog
Perflog is for tracking the user's actions in sequential order. It's a csv file.

For the local build, the file is located in
```sh
/ssp_git/roots/install/logsperf-buyerserver1.csv.
```
For production, find it in cloud health. LogSearch->Cloud Health Perf Log Details, search User by email address.
* [PR from Milton for Perflog](https://github.wdf.sap.corp/Ariba-Ond/Buyer/pull/3070)

### 3.10 Check and copy file from dev service server
1) Connect to dev service server `hydra.ariba.com`, login as `devbuild`.
```sh
ssh devbuild@hydra.ariba.com
```
2) Navigate to the buyer root directory for the particular server, eg. dev6, dev9, etc.
```sh
cd /home/svcdev6/buyer   # dev6
cd /home/svcdev9/buyer   # dev9
cd /home/svcdev11/buyer  # dev11
```
3) Navigate the particular label. You can check the label number in anrc.ariba.com.
```sh
cd SSP.2019.gMaster-5616
```
4) Then you can open or copy files.
```sh
# copy p table file to local.
scp devbuild@hydra.ariba.com:/home/svcdev9/buyer/SSP.2018.mDev-7035/config/Parameters.table .
```

You can also connect to the specific server directly.  
1) Go to anrc.ariba.com, find the service(eg. dev11), click the link for 'buyer'.  
2) Note down the label(eg. SSP.2019.gMaster-5616) at top of the page.  
3) Copy the url of the server(eg. app1471.lab1.ariba.com, app623.lab1.ariba.com or app622.lab1.ariba.com), which is at the right side of “Customer Sites”.  
4) In terminal, connect to the server with user `svcdev11`.  
```sh
ssh svcdev11@app1471.lab1.ariba.com
```
5) Navigate to the directory for buyer and find the file in the particular label folder, eg SSP.2019.gMaster-5616.
```sh
cd buyer
cd SSP.2019.gMaster-5616
scp remote_file ~ # Copy file from server to local directly
```

**Connect svcdev9 on Mac**  
1) Finder->Go->Connect to Server, access smb://maytag.ariba.com/home/svcdev9.
* user name: global\i857285
* password: domain password

You should request access to maytag server first, see ticket: https://product-jira.ariba.com/browse/HOA-159240.

**Connect svcdev9 on Windows**  
For windows, we need to install putty and access
```raw
\\maytag.ariba.com\home\svcdev9\
```

### 3.11 Access Subzero
* Server: smb://Subzero.ariba.com
* Credentials: GLOBAL\I857285, domain password
* Path: /subzero/opsdumps/2019-02-19/HOA-201484

Useful JIRA tickets:
* https://product-jira.ariba.com/browse/HOA-201484
* https://product-jira.ariba.com/browse/HOA-81858

### 3.12 Directly way to go to AN Dev6
Go to anrc.ariba.com->dev6->AN->Supplier(Insecure), input user qatestsupplier1@ariba.com, and click login button.

### 3.13 Create admin user on AN
Check wiki [Customization Admin: Creating a custom attribute and using it in a customization project](https://wiki.ariba.com/display/~arana/Customization+Admin%3A+Creating+a+custom+attribute+and+using+it+in+a+customization+project).

### 3.14 Find CQ/Traige on Azure
Visit https://cq-jenkins.ariba-cobalt.com:8443/view/buyer_hana_trunk_branch/, login with GitHub account.

## 4. Coding
### 4.1 Add persisting field(database level field)
```sh
mvn install
gnu initdb –loadMeta
gnu simplemigrator
```
### 4.2 Gnu init db issue
```sh
$ gnu initdb -loadmeta
gnu: warning: PATH contains /home/I857285/.local/bin which does not exist
gnu: warning: PATH contains /home/I857285/bin which does not exist
using logs/dbinit.txt as the log file
tableedit: failed during processing, error output follows:
tableedit: > Picked up JAVA_TOOL_OPTIONS: -Dfile.encoding=UTF8
tableedit: > Loading table current from config/Parameters.table returned null
tableedit: > *!* TABLEEDIT_OUTPUT !*!
tableedit: exit status was 1
```
To fix the issue, run the following command to assign authorization to Parameters.table.
```sh
$ cd /ariba/ssp_git
$ sudo chown $USER . -R
```
### 4.3 Prevent field value from being overwritten by triggers
Call the following method. It's like the field is manually edited by user. In this case, the value will always be respected.
```java
BaseObject.markAttributeSet()
```
### 4.4 Mapping between Task and Class for Data Import/Export
Check the variable `pullNameToClassMap` in static block of IntegrationDataPersistenceServlet.java.
```java
static {
   pullNameToClassMap.put("UserConsolidatedPull","ariba.common.core.User");
   pullNameToClassMap.put("TaxCodePull","ariba.tax.core.TaxCode");
   pullNameToClassMap.put("ConsolidatedGroupPull","ariba.user.core.Group");
   pullNameToClassMap.put("CompanyCodePull","ariba.core.CompanyCode");
   pullNameToClassMap.put("CompanyCodeIOComboPull",
           "ariba.core.CompanyCodeIOCombo");
   pullNameToClassMap.put("CompanyCodeWBSComboPull",
           "ariba.core.CompanyCodeWBSCombo");
   pullNameToClassMap.put("CurrencyConversionRatePull",
           "ariba.basic.core.CurrencyConversionRate");
   pullNameToClassMap.put("CostCenterPull","ariba.core.CostCenter");
   pullNameToClassMap.put("InternalOrderPull","ariba.core.InternalOrder");
   pullNameToClassMap.put("GeneralLedgerPull","ariba.core.GeneralLedger");
   pullNameToClassMap.put("WBSElementPull","ariba.core.WBSElement");
   pullNameToClassMap.put("AccCategoryFieldStatusComboPull",
           "ariba.core.AccCategoryFieldStatusCombo");
   pullNameToClassMap.put("AccountCategoryPull","ariba.core.AccountCategory");
   pullNameToClassMap.put("AccountTypePull", "ariba.common.core.AccountType");
   pullNameToClassMap.put("AssetPull","ariba.core.Asset");
   pullNameToClassMap.put("RemittanceLocationConsolidatedPull","ariba.payment.core.RemittanceLocation");
   pullNameToClassMap.put("SupplierConsolidatedPull","ariba.common.core.Supplier");
   pullNameToClassMap.put("SupplierLocationConsolidatedPull","ariba.common.core.SupplierLocation");
   pullNameToClassMap.put("PurchaseOrgSupplierComboPull","ariba.core.PorgSupplierCombo");
   pullNameToClassMap.put("AddressPull","ariba.common.core.Address");
   pullNameToClassMap.put("PurchaseOrgPull","ariba.core.PurchaseOrg");
   pullNameToClassMap.put("PlantPurchaseOrgComboPull","ariba.core.PlantPurchaseOrgCombo");
   pullNameToClassMap.put("PurchaseGroupPull","ariba.core.PurchaseGroup");
   pullNameToClassMap.put("PartitionedCommodityCodePull","ariba.common.core.PartitionedCommodityCode");
   pullNameToClassMap.put("PaymentTermsPull","ariba.payment.core.PaymentTerms");
   pullNameToClassMap.put("CostCenterLanguagePull","ariba.core.CostCenter");
   pullNameToClassMap.put("GeneralLedgerLanguagePull","ariba.core.GeneralLedger");
   pullNameToClassMap.put("AccountCategoryLanguagePull","ariba.core.AccountCategory");
   pullNameToClassMap.put("PartitionedCommodityCodeLanguagePull","ariba.common.core.PartitionedCommodityCode");
   pullNameToClassMap.put("PaymentTermsLanguagePull","ariba.payment.core.PaymentTerms");
   pullNameToClassMap.put("TaxCodeLanguagePull","ariba.tax.core.TaxCode");
   pullNameToClassMap.put("PlantPull","ariba.common.core.Address");
   pullNameToClassMap.put("PaymentTermsConsolidatedPull","ariba.payment.core.PaymentTerms");
}
```

### 4.5 Debug Expression Evaluation
Set breakpoint to AribaExprEvaluator.java->evaluate()

### 4.6 Evaluate expression with the given string
Refer to method `defaultFromExpression` and `getFieldExpression` in PunchoutLIC_TemplateBasedAccountDefaulter.java.

Below is the implementation, see https://github.wdf.sap.corp/Ariba-Ond/Buyer/pull/6642.
```java
/**
 * Evaluate the expression with the given string.
 * @param obj object
 * @param strExpr expression string
 * @return
 */
private Object evaluateExpresssionValue (BaseObject obj, String strExpr)
{
    try {
        Expression expr = null;

        if (!StringUtil.nullOrEmptyOrBlankString(strExpr)) {
            Environment env = new Environment(
                    AMLTypeRegistry.instance(obj.getVariant()));
            expr = AribaExprEvaluator.instance().compile(env, obj.getTypeName(), strExpr);
        }

        if (expr != null) {
            Object result = expr.evaluate(obj);
            Log.tax.debug(Fmt.S("Expression %s was evaluated to %s.", strExpr, result));
            return result;
        }
    }
    catch (ExpressionEvaluatorException e) {
        Log.tax.warn(Fmt.S("Could not evaluate expression %s: %s.", strExpr, e.getMessage()));
    }
    catch (ExpressionException e) {
        Log.tax.warn(Fmt.S("Invalid expression %s: %s.", strExpr, e.getMessage()));
    }
    Log.tax.debug(Fmt.S("Expression %s was evaluated to null.", strExpr));

    return null;
}
```
### 4.7 Create new Invoice Exception Type
Check wiki page [Creating new Invoice Exception Type](https://wiki.ariba.com/display/ENGKB/Creating+new+Invoice+Exception+Type).

1) Update files in folder //ariba/ond/buyer/dev/invoicing/configTemplates/Invoicing/SharedServicesOnly/defaultERP/config/partition/data/
* InvoiceExceptionType.csv (insert new row)
* InvoiceExceptionTypeValidation.csv (insert new row)
* MigrationInvoiceExceptionTypeDelete.csv(replace)
* MigrationInvoiceExceptionTypeLoad.csv(replace)
* MigrationInvoiceExceptionTypeValidationLoad.csv(replace)
* translations/English/InvoiceExceptionType.csv (insert new row)
* translations/English/MigrationInvoiceExceptionTypeLoad.csv (insert new row)

2) Update //ariba/ond/buyer/dev/migrate/generic/etc/migration/PostUpgradeTask.csv
```sh
15s2-2018-01-6,RealmLooperRunInvoiceExcepTypeIntegrationEvents,None.Task,FALSE,,,FALSE
15s2-2018-01-7,RealmLooperRunInvoiceExcepTypeDisableIntegrationEvents,None.Task,FALSE,,,FALSE
```
The first task will create the new InvoiceExceptionType; the second task will disable the new exception.

3) Run the following command in //ariba/ond/buyer/dev/migrate/generic, restart sandbox.
```sh
# gnu make
mvn install
```
4) Copy the migration files
* MigrationInvoiceExceptionTypeLoad.csv
* MigrationInvoiceExceptionTypeValidationLoad.csv
* MigrationInvoiceExceptionTypeDelete.csv

to the following realm specific folders:
* /ssp_git/root/install/config/variants/vgeneric/partitions/pgeneric/data
* /ssp_git/root/install/config/variants/vpsoft84ora/partitions/ppsoft84ora/data
* /ssp_git/root/install/config/variants/vsap/partitions/psap/data

5) Go to inspector, select System partition, ‘Lookup Persisted ClusterRoots’, select PostUpgradeTaskStatus from dropdown and click Search.
* Click the link for "15s2-2018-01-6"(wait for a while if you don’t see it after the sandbox is restarted.)
* Status field will probably be 3(Completed/already run).
* At the bottom under setField, click dropdown and select Status, put 0(NEW) in box for Value, click Submit.
* All the entries in PostUpgradeTask.csv should be displayed here. If you don’t see any of them and you get "Version.BuildName is null or empty. Task cannot run" error when you try to run the task ‘PostUpgradeTask’, it means something wrong with the BuildName. Create file named ‘BuildName’ in either "config/BuildName" or "internal/build/config/BuildName" of your buyer installer folder. For example, the full path is ‘/arba/ssp_git/root/install/config/BuildName’. Add the label of your buyer build to this file, for example ‘SSP.2018.mDev-9062’.

6) Repeat above step for "15s2-2018-01-7"

7) Go to service manager, do not administer realm. Click Advanced, click Scheduled Tasks, select Partition/None from dropdown, search for "PostUpgradeTask". Run this.

8) When it completes, check realms for your exception. It should be created but deactivated in the specific realm.
* In addition: (on service) If you run RU, you should run PostUpgradeTask. If it does not, go to Service Manager -> Advanced -> Scheduled Tasks -> run 'PostUpgradeTask'

## 5. Troubleshooting in Production
### 5.1 Thread Dump
1) Open one web browser, logon to Buyer US, find the customer’s realm, join. Note the node, eg. C86_UI2, it can be found at the bottom of page after you login to the customer’s realm.  
2) Open another web browser, logon to Buyer US->RealTime Thread Details, select Node.  
3) Go to first web browser, take any action which takes long time, eg. Go to IR, edit and save.  
4) Go back to Debugging tool, click “Get Thread Dump” and “Analyze Thread Dump” for the logs.  

### 5.2 Get invoice cXML from customer’s realm
1) Search customer's realm in production, note the Buyer ID.  
2) Logon to ops.ariba.com, click “AN Admin”.  
3) Switch to Buyer tab, search the buyer via AN ID got from step1.  
4) Login as this buyer, go to Ariba Network and search document.  

### 5.3 Find log for particular IR
Take 'IR3392954608-7592' as example, search it through cloud health->LogSearch->Cloud Health KR Log Impact Analysis. Specify the search criteria, especially the date, realm and IR id.

When the result is available, scroll down, you will see the node name.

Then, we can search log from the particular node and specific time frame.

### 5.4 Cloud Health Splunk
Find KR log, DF repair log, https://spksea001.snv.ariba.com/en-US/app/cloudhealth2/cloud_health_home

LogSearch->Cloud Health KR Log Details
* sourcetype = ast.kr.buyer
* log category: application.procurement.repair

### 5.5 Get all customizations from production
Create HOA ticket to run the script in production and let Ops share the outputs.
* HOA: https://product-jira.ariba.com/browse/HOA-217860
* Script: https://github.wdf.sap.corp/Ariba-Ond/BuyerDataFix/pull/24/

Manual approach, which is obsolete.   
1) SSH into hydra.ariba.com as user `devbuild`.
```sh
ssh devbuild@hydra.ariba.com
#ssh devbuild@app1165.lab1.ariba.com
# input password
cd /home/devbuild/zhou
```
2) Run the command ./safeguard-login and provide the safeguard login.  
3) Run the command ./getallcustomers and follow the prompt to provide the SAP username and password.

For different data centers, run
```sh
./getallcustomers --help
```
The output goes to customizations directory.

## 6. External Tax Integration(Tax API)
Check wiki [External Tax Integration](https://wiki.ariba.com/pages/viewpage.action?spaceKey=ENGKB&title=External+Tax+Integration).

Key points:
* InvoiceTestScenarioConfiguration.java

### 6.1 Enable Tax API Feature
In SAP realm:  
1) Enable feature toggle P2X-670 and ExternalTaxIntegrationPhaseTwo.  
2) Enable UseEnhancedIRTaxHandling feature.  
3) Turn on the following parameters:
* Application.Procure.EnableTaxCalculationInExternalSystems
* Application.Procure.EnhancedTaxCalculationInExternalSystems
* Application.Invoicing.UseTLCTaxEngine
* Application.Procure.EnableTaxesChargesAndDiscount

4) Change email address for ghalas to ‘ghalas@ariba.com’  
5) Run "Import External Tax Calculation Providers" to import the external tax provider.
```javascript
"UTF-8"
COMPANYCODE,TAXSOURCE,APPROVABLENAME
"3000","ThomsonReuters","ariba.invoicing.core.InvoiceReconciliation"
"3000","ThomsonReuters","ariba.purchasing.core.Requisition"
```
6) Add approval process for invoice.(otherwise, you will get null expected tax, null tax code.)
### 6.2 Stager Tool
1) Go to "Test Central", set user to login, search ‘Run Invoice Test Scenario’.  
2) Select 'Tax API Integration Testing’ option. Copy and paste the following script to the input box, click Run.
```javascript
{
   ValidateTaxAPI_= {
      SetUpExternalTaxProvider_1= {
         InvoiceId= "1",
         Line1Tax1= 40
      },
      PostMultiLineNonPOInvoice_1= {
         InvoiceId= "1",
         Line1Qty= 15,
         Line1Price= 100,
         Line1Tax1= 30,
         UseHeaderTax= false
      },
      FullyApproveInvoice= {
         InvoiceId= "1"
      },
      FullyApproveIR= {
         InvoiceId= "1"
      }
   }
}
```
Go to front door, verify that UnderTaxVariance exception is raised on IR. This is because the expected tax from tax engine is 40 USD, whereas the tax on invoice is 30 USD.

### 6.3 Setup SOAP response for TAX API.
Refer to https://www.soapui.org/soap-mocking/service-mocking-overview.html.

1) In SOAPUI5, create a new SOAP project
* Project Name: TaxAPI
* WSDL Address: https://10.48.104.140/Buyer/soap/p2pTeSap/TaxServiceExport?wsdl

2) SOAP project and SOAP Interface are created. Right click on the SOAP Interface and select ‘Generate SOAP Mock Service’.

3) The ‘Generate MockService’ dialog will appear, leave unchanged, OK.

4) Continue with OK.

5) The mock service is created.

6) Double click on the ‘Response1’, you see the response dialog.

7) Paste the dummy response to the right text box. The following sample response is for **TwoLinesTwoTax(Header)** scenario. Notice that this response should be same with the initial response for the same IR when we use the stager tool.
```xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:Ariba:Buyer:TaxAPI">
   <soapenv:Body>
      <urn:TaxServiceExportReply partition="prealm_2" variant="vrealm_2">
         <urn:ProcureLineItemCollection_TaxServiceAPIResponse_Item>
            <urn:item>
               <urn:ExternalTaxResponseStatus>
                  <urn:Success>True</urn:Success>
               </urn:ExternalTaxResponseStatus>
               <urn:LineItems>
                  <urn:item>
                     <urn:ExternalTaxItem>
                        <urn:item>
                           <urn:IsBuyerPayableTax>false</urn:IsBuyerPayableTax>
                           <urn:AbatementPercent>100</urn:AbatementPercent>
                           <urn:Category>POInv</urn:Category>
                           <urn:Description>Sales Tax</urn:Description>
                           <urn:ExternalTaxType>
                              <urn:UniqueName>SalesTax</urn:UniqueName>
                           </urn:ExternalTaxType>
                           <urn:FormulaString>NetAmount</urn:FormulaString>
                           <urn:IsDeductible>0</urn:IsDeductible>
                           <urn:PerUnit>0</urn:PerUnit>
                           <urn:Percent>4</urn:Percent>
                           <urn:TaxAmount>
                              <urn:Amount>15</urn:Amount>
                              <urn:Currency>
                                 <urn:UniqueName>USD</urn:UniqueName>
                              </urn:Currency>
                           </urn:TaxAmount>
                           <urn:TaxableAmount>
                              <urn:Amount>100</urn:Amount>
                              <urn:Currency>
                                 <urn:UniqueName>USD</urn:UniqueName>
                              </urn:Currency>
                           </urn:TaxableAmount>
                           <urn:TaxComponents>
                              <urn:item>
                                 <urn:Description>State tax</urn:Description>
                                 <urn:ExternalTaxType>
                                    <urn:UniqueName>SalesTax</urn:UniqueName>
                                 </urn:ExternalTaxType>
                                 <urn:FormulaString>aaa</urn:FormulaString>
                                 <urn:Percent>1</urn:Percent>
                                 <urn:TaxAmount>
                                    <urn:Amount>1</urn:Amount>
                                    <urn:Currency>
                                       <urn:UniqueName>USD</urn:UniqueName>
                                    </urn:Currency>
                                 </urn:TaxAmount>
                                 <urn:TaxableAmount>
                                    <urn:Amount>100</urn:Amount>
                                    <urn:Currency>
                                       <urn:UniqueName>USD</urn:UniqueName>
                                    </urn:Currency>
                                 </urn:TaxableAmount>
                              </urn:item>
                              <urn:item>
                                 <urn:Description>City tax</urn:Description>
                                 <urn:ExternalTaxType>
                                    <urn:UniqueName>SalesTax</urn:UniqueName>
                                 </urn:ExternalTaxType>
                                 <urn:FormulaString>bbb</urn:FormulaString>
                                 <urn:Percent>2</urn:Percent>
                                 <urn:TaxAmount>
                                    <urn:Amount>2</urn:Amount>
                                    <urn:Currency>
                                       <urn:UniqueName>USD</urn:UniqueName>
                                    </urn:Currency>
                                 </urn:TaxAmount>
                                 <urn:TaxableAmount>
                                    <urn:Amount>100</urn:Amount>
                                    <urn:Currency>
                                       <urn:UniqueName>USD</urn:UniqueName>
                                    </urn:Currency>
                                 </urn:TaxableAmount>
                              </urn:item>
                              <urn:item>
                                 <urn:Description>County tax</urn:Description>
                                 <urn:ExternalTaxType>
                                    <urn:UniqueName>SalesTax</urn:UniqueName>
                                 </urn:ExternalTaxType>
                                 <urn:FormulaString>ccc</urn:FormulaString>
                                 <urn:Percent>3</urn:Percent>
                                 <urn:TaxAmount>
                                    <urn:Amount>3</urn:Amount>
                                    <urn:Currency>
                                       <urn:UniqueName>USD</urn:UniqueName>
                                    </urn:Currency>
                                 </urn:TaxAmount>
                                 <urn:TaxableAmount>
                                    <urn:Amount>100</urn:Amount>
                                    <urn:Currency>
                                       <urn:UniqueName>USD</urn:UniqueName>
                                    </urn:Currency>
                                 </urn:TaxableAmount>
                              </urn:item>
                           </urn:TaxComponents>
                        </urn:item>
                        <urn:item>
                           <urn:IsBuyerPayableTax>true</urn:IsBuyerPayableTax>
                           <urn:AbatementPercent>100</urn:AbatementPercent>
                           <urn:Category>POInv</urn:Category>
                           <urn:Description>VAT Tax</urn:Description>
                           <urn:ExternalTaxType>
                              <urn:UniqueName>VATTax</urn:UniqueName>
                           </urn:ExternalTaxType>
                           <urn:FormulaString>NetAmount</urn:FormulaString>
                           <urn:IsDeductible>0</urn:IsDeductible>
                           <urn:PerUnit>0</urn:PerUnit>
                           <urn:Percent>4</urn:Percent>
                           <urn:TaxAmount>
                              <urn:Amount>15</urn:Amount>
                              <urn:Currency>
                                 <urn:UniqueName>USD</urn:UniqueName>
                              </urn:Currency>
                           </urn:TaxAmount>
                           <urn:TaxableAmount>
                              <urn:Amount>100</urn:Amount>
                              <urn:Currency>
                                 <urn:UniqueName>USD</urn:UniqueName>
                              </urn:Currency>
                           </urn:TaxableAmount>
                        </urn:item>
                     </urn:ExternalTaxItem>
                     <urn:NumberInCollection>1</urn:NumberInCollection>
                     <urn:TaxCode>
                        <urn:Country>
                           <urn:UniqueName>US</urn:UniqueName>
                        </urn:Country>
                        <urn:UniqueName>I0</urn:UniqueName>
                     </urn:TaxCode>
                  </urn:item>
                  <urn:item>
                     <urn:ExternalTaxItem>
                        <urn:item>
                           <urn:IsBuyerPayableTax>false</urn:IsBuyerPayableTax>
                           <urn:AbatementPercent>100</urn:AbatementPercent>
                           <urn:Category>POInv</urn:Category>
                           <urn:Description>Sales Tax</urn:Description>
                           <urn:ExternalTaxType>
                              <urn:UniqueName>SalesTax</urn:UniqueName>
                           </urn:ExternalTaxType>
                           <urn:FormulaString>NetAmount</urn:FormulaString>
                           <urn:IsDeductible>0</urn:IsDeductible>
                           <urn:PerUnit>0</urn:PerUnit>
                           <urn:Percent>4</urn:Percent>
                           <urn:TaxAmount>
                              <urn:Amount>10</urn:Amount>
                              <urn:Currency>
                                 <urn:UniqueName>USD</urn:UniqueName>
                              </urn:Currency>
                           </urn:TaxAmount>
                           <urn:TaxableAmount>
                              <urn:Amount>200</urn:Amount>
                              <urn:Currency>
                                 <urn:UniqueName>USD</urn:UniqueName>
                              </urn:Currency>
                           </urn:TaxableAmount>
                        </urn:item>
                        <urn:item>
                           <urn:IsBuyerPayableTax>true</urn:IsBuyerPayableTax>
                           <urn:AbatementPercent>100</urn:AbatementPercent>
                           <urn:Category>POInv</urn:Category>
                           <urn:Description>VAT Tax</urn:Description>
                           <urn:ExternalTaxType>
                              <urn:UniqueName>VATTax</urn:UniqueName>
                           </urn:ExternalTaxType>
                           <urn:FormulaString>NetAmount</urn:FormulaString>
                           <urn:IsDeductible>0</urn:IsDeductible>
                           <urn:PerUnit>0</urn:PerUnit>
                           <urn:Percent>4</urn:Percent>
                           <urn:TaxAmount>
                              <urn:Amount>10</urn:Amount>
                              <urn:Currency>
                                 <urn:UniqueName>USD</urn:UniqueName>
                              </urn:Currency>
                           </urn:TaxAmount>
                           <urn:TaxableAmount>
                              <urn:Amount>200</urn:Amount>
                              <urn:Currency>
                                 <urn:UniqueName>USD</urn:UniqueName>
                              </urn:Currency>
                           </urn:TaxableAmount>
                        </urn:item>
                     </urn:ExternalTaxItem>
                     <urn:NumberInCollection>2</urn:NumberInCollection>
                     <urn:TaxCode>
                        <urn:Country>
                           <urn:UniqueName>US</urn:UniqueName>
                        </urn:Country>
                        <urn:UniqueName>I0</urn:UniqueName>
                     </urn:TaxCode>
                  </urn:item>
                  <urn:item>
                     <urn:ExternalTaxItem />
                     <urn:NumberInCollection>3</urn:NumberInCollection>
                  </urn:item>
                  <urn:item>
                     <urn:ExternalTaxItem />
                     <urn:NumberInCollection>4</urn:NumberInCollection>
                  </urn:item>
               </urn:LineItems>
               <urn:UniqueName>IR241020181405_TwoLinesTwoTax_Prorated_-139</urn:UniqueName>
            </urn:item>
         </urn:ProcureLineItemCollection_TaxServiceAPIResponse_Item>
      </urn:TaxServiceExportReply>
   </soapenv:Body>
</soapenv:Envelope>
```
SOAP Response for **TwoLineTwoTax(LineLevel)**.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:Ariba:Buyer:TaxAPI">
   <soapenv:Body>
      <urn:TaxServiceExportReply partition="prealm_2" variant="vrealm_2">
         <urn:ProcureLineItemCollection_TaxServiceAPIResponse_Item>
            <urn:item>
               <urn:ExternalTaxResponseStatus>
                  <urn:Success>True</urn:Success>
               </urn:ExternalTaxResponseStatus>
               <urn:LineItems>
                  <urn:item>
                     <urn:ExternalTaxItem>
                        <urn:item>
                           <urn:IsBuyerPayableTax>false</urn:IsBuyerPayableTax>
                           <urn:AbatementPercent>100</urn:AbatementPercent>
                           <urn:Category>POInv</urn:Category>
                           <urn:Description>SalesTax</urn:Description>
                           <urn:ExternalTaxType>
                              <urn:UniqueName>SalesTax</urn:UniqueName>
                           </urn:ExternalTaxType>
                           <urn:FormulaString>NetAmount</urn:FormulaString>
                           <urn:IsDeductible>0</urn:IsDeductible>
                           <urn:InvoiceCitation>SalesTax</urn:InvoiceCitation>
                           <urn:PerUnit>0</urn:PerUnit>
                           <urn:Percent>4</urn:Percent>
                           <urn:TaxAmount>
                              <urn:Amount>15</urn:Amount>
                              <urn:Currency>
                                 <urn:UniqueName>USD</urn:UniqueName>
                              </urn:Currency>
                           </urn:TaxAmount>
                           <urn:TaxableAmount>
                              <urn:Amount>100</urn:Amount>
                              <urn:Currency>
                                 <urn:UniqueName>USD</urn:UniqueName>
                              </urn:Currency>
                           </urn:TaxableAmount>
                           <urn:TaxComponents>
                              <urn:item>
                                 <urn:Description>State tax</urn:Description>
                                 <urn:ExternalTaxType>
                                    <urn:UniqueName>SalesTax</urn:UniqueName>
                                 </urn:ExternalTaxType>
                                 <urn:FormulaString>aaa</urn:FormulaString>
                                 <urn:Percent>1</urn:Percent>
                                 <urn:TaxAmount>
                                    <urn:Amount>1</urn:Amount>
                                    <urn:Currency>
                                       <urn:UniqueName>USD</urn:UniqueName>
                                    </urn:Currency>
                                 </urn:TaxAmount>
                                 <urn:TaxableAmount>
                                    <urn:Amount>100</urn:Amount>
                                    <urn:Currency>
                                       <urn:UniqueName>USD</urn:UniqueName>
                                    </urn:Currency>
                                 </urn:TaxableAmount>
                              </urn:item>
                              <urn:item>
                                 <urn:Description>City tax</urn:Description>
                                 <urn:ExternalTaxType>
                                    <urn:UniqueName>SalesTax</urn:UniqueName>
                                 </urn:ExternalTaxType>
                                 <urn:FormulaString>bbb</urn:FormulaString>
                                 <urn:Percent>2</urn:Percent>
                                 <urn:TaxAmount>
                                    <urn:Amount>2</urn:Amount>
                                    <urn:Currency>
                                       <urn:UniqueName>USD</urn:UniqueName>
                                    </urn:Currency>
                                 </urn:TaxAmount>
                                 <urn:TaxableAmount>
                                    <urn:Amount>100</urn:Amount>
                                    <urn:Currency>
                                       <urn:UniqueName>USD</urn:UniqueName>
                                    </urn:Currency>
                                 </urn:TaxableAmount>
                              </urn:item>
                              <urn:item>
                                 <urn:Description>County tax</urn:Description>
                                 <urn:ExternalTaxType>
                                    <urn:UniqueName>SalesTax</urn:UniqueName>
                                 </urn:ExternalTaxType>
                                 <urn:FormulaString>ccc</urn:FormulaString>
                                 <urn:Percent>3</urn:Percent>
                                 <urn:TaxAmount>
                                    <urn:Amount>3</urn:Amount>
                                    <urn:Currency>
                                       <urn:UniqueName>USD</urn:UniqueName>
                                    </urn:Currency>
                                 </urn:TaxAmount>
                                 <urn:TaxableAmount>
                                    <urn:Amount>100</urn:Amount>
                                    <urn:Currency>
                                       <urn:UniqueName>USD</urn:UniqueName>
                                    </urn:Currency>
                                 </urn:TaxableAmount>
                              </urn:item>
                           </urn:TaxComponents>
                        </urn:item>
                        <urn:item>
                           <urn:IsBuyerPayableTax>true</urn:IsBuyerPayableTax>
                           <urn:AbatementPercent>100</urn:AbatementPercent>
                           <urn:Category>POInv</urn:Category>
                           <urn:Description>VATTax</urn:Description>
                           <urn:ExternalTaxType>
                              <urn:UniqueName>VATTax</urn:UniqueName>
                           </urn:ExternalTaxType>
                           <urn:FormulaString>NetAmount</urn:FormulaString>
                           <urn:IsDeductible>0</urn:IsDeductible>
                           <urn:InvoiceCitation>VATTax</urn:InvoiceCitation>
                           <urn:PerUnit>0</urn:PerUnit>
                           <urn:Percent>4</urn:Percent>
                           <urn:TaxAmount>
                              <urn:Amount>15</urn:Amount>
                              <urn:Currency>
                                 <urn:UniqueName>USD</urn:UniqueName>
                              </urn:Currency>
                           </urn:TaxAmount>
                           <urn:TaxableAmount>
                              <urn:Amount>100</urn:Amount>
                              <urn:Currency>
                                 <urn:UniqueName>USD</urn:UniqueName>
                              </urn:Currency>
                           </urn:TaxableAmount>
                        </urn:item>
                     </urn:ExternalTaxItem>
                     <urn:NumberInCollection>1</urn:NumberInCollection>
                     <urn:TaxCode>
                        <urn:Country>
                           <urn:UniqueName>US</urn:UniqueName>
                        </urn:Country>
                        <urn:UniqueName>I0</urn:UniqueName>
                     </urn:TaxCode>
                  </urn:item>
                  <urn:item>
                     <urn:ExternalTaxItem>
                        <urn:item>
                           <urn:IsBuyerPayableTax>false</urn:IsBuyerPayableTax>
                           <urn:AbatementPercent>100</urn:AbatementPercent>
                           <urn:Category>POInv</urn:Category>
                           <urn:Description>SalesTax</urn:Description>
                           <urn:ExternalTaxType>
                              <urn:UniqueName>SalesTax</urn:UniqueName>
                           </urn:ExternalTaxType>
                           <urn:FormulaString>NetAmount</urn:FormulaString>
                           <urn:IsDeductible>0</urn:IsDeductible>
                           <urn:InvoiceCitation>SalesTax</urn:InvoiceCitation>
                           <urn:PerUnit>0</urn:PerUnit>
                           <urn:Percent>4</urn:Percent>
                           <urn:TaxAmount>
                              <urn:Amount>10</urn:Amount>
                              <urn:Currency>
                                 <urn:UniqueName>USD</urn:UniqueName>
                              </urn:Currency>
                           </urn:TaxAmount>
                           <urn:TaxableAmount>
                              <urn:Amount>200</urn:Amount>
                              <urn:Currency>
                                 <urn:UniqueName>USD</urn:UniqueName>
                              </urn:Currency>
                           </urn:TaxableAmount>
                        </urn:item>
                        <urn:item>
                           <urn:IsBuyerPayableTax>true</urn:IsBuyerPayableTax>
                           <urn:AbatementPercent>100</urn:AbatementPercent>
                           <urn:Category>POInv</urn:Category>
                           <urn:Description>VATTax</urn:Description>
                           <urn:ExternalTaxType>
                              <urn:UniqueName>VATTax</urn:UniqueName>
                           </urn:ExternalTaxType>
                           <urn:FormulaString>NetAmount</urn:FormulaString>
                           <urn:IsDeductible>0</urn:IsDeductible>
                           <urn:InvoiceCitation>VATTax</urn:InvoiceCitation>
                           <urn:PerUnit>0</urn:PerUnit>
                           <urn:Percent>4</urn:Percent>
                           <urn:TaxAmount>
                              <urn:Amount>10</urn:Amount>
                              <urn:Currency>
                                 <urn:UniqueName>USD</urn:UniqueName>
                              </urn:Currency>
                           </urn:TaxAmount>
                           <urn:TaxableAmount>
                              <urn:Amount>200</urn:Amount>
                              <urn:Currency>
                                 <urn:UniqueName>USD</urn:UniqueName>
                              </urn:Currency>
                           </urn:TaxableAmount>
                        </urn:item>
                     </urn:ExternalTaxItem>
                     <urn:NumberInCollection>4</urn:NumberInCollection>
                     <urn:TaxCode>
                        <urn:Country>
                           <urn:UniqueName>US</urn:UniqueName>
                        </urn:Country>
                        <urn:UniqueName>I0</urn:UniqueName>
                     </urn:TaxCode>
                  </urn:item>
                  <urn:item>
                     <urn:ExternalTaxItem />
                     <urn:NumberInCollection>2</urn:NumberInCollection>
                  </urn:item>
                  <urn:item>
                     <urn:ExternalTaxItem />
                     <urn:NumberInCollection>3</urn:NumberInCollection>
                  </urn:item>
                  <urn:item>
                     <urn:ExternalTaxItem />
                     <urn:NumberInCollection>5</urn:NumberInCollection>
                  </urn:item>
                  <urn:item>
                     <urn:ExternalTaxItem />
                     <urn:NumberInCollection>6</urn:NumberInCollection>
                  </urn:item>
               </urn:LineItems>
               <urn:UniqueName>IR271120181432_TwoLinesTwoTax_Prorated_0-48</urn:UniqueName>
            </urn:item>
         </urn:ProcureLineItemCollection_TaxServiceAPIResponse_Item>
      </urn:TaxServiceExportReply>
   </soapenv:Body>
</soapenv:Envelope>
```
* Refer to `SINV-10320` to get soap response for Posting call and LICM.

Close the dialog to save the response.  
8) Click the arrow button in mockservice dialog to launch the dummy response service.

9) In the operation dialog, click the second button to create SOAP request.

10) OK and continue.

11) The Request dialog shows up. The left side is the request and the right side is the response.

12) Click the arrow button to send out the request and you will see the response. The response comes from ‘Response1’.

13) Use IP address.  
Currently, the URL address is using the machine name. Find the IP address of your local machine with ‘ifconfig’. Then, replace the machine name with ip address.
```raw
From: http://PALM00634007A:8088/mockTaxServiceExportBinding
To: http://127.0.0.1:8088/mockTaxServiceExportBinding
```
14) The WSDL in SOAPUI5 for this mock service is http://127.0.0.1:8088/mockTaxServiceExportBinding?WSDL

15) Change URL of the End Point in Service Manager.  
a) Go to service manager, SAP realm->Integration Manager->Integration Configuration.  
b) Search ‘Document Data for External Tax Calculation’, select it and Edit.  
c) Change the URL to the address of the mock soap service, eg. http://127.0.0.1:8088/mockTaxServiceExportBinding.

Notice that, if you run the stager tool to generate invoice and IR for tax API. This url will be changed back to ‘http://localhost:9998/ERP’.

Change host name from `localhost` to ip address `127.0.0.1` if necessary. Sometimes, I have to switch between them once one of them just stops working.
* http://localhost:8088/mockTaxServiceExportBinding
* http://127.0.0.1:8088/mockTaxServiceExportBinding

17) Test  
Manually create Invoice to call Tax API(**Header Level**).  
a) Setup the tax api with SOAPUI, see above. (use the header level response).
b) Create non-PO invoice with two line items.  
* Quantity=10, Price=$10.
* Quantity=10, Price=$20.

c) Add two header level tax.
* Sales Tax, $20,
* VAT tax, $10

d) Set Payment Terms to ‘0004’.  
e) Replace IR ID in the dummy response in SOAP UI.  
f) Submit and approve the invoice, IR should get generated with proper tax exceptions.

Manually create Invoice to call Tax API(**Line Level**).  
a) Setup the tax api with SOAPUI, see above. (use the line level response).  
b) Create non-PO invoice with two line items.  
* Quantity=10, Price=$10.
* Quantity=10, Price=$20.

c) Add two line level tax for each line.
* Sales Tax, $20,
* VAT tax, $10

d) Set Payment Terms to ‘PT1’.
e) Replace IR ID in the dummy response in SOAP UI.  
f) Submit and approve the invoice, IR should get generated.  

18) `Recalculate Tax` button  
In addition, you can test the tax calculation call through "Recalculate Tax" button on IR.  
Open the IR -> Edit Mode -> Edit Tax Details, click the ‘Recalculate Tax’ button. We should get response from the mock soap service.

### 6.4 SoapUI
Sometimes, we will encounter the issue that SoapUI freezes without any response.  
1) Start ‘Activity Monitor’ and Force Kill your dead soapUI process. [Or use Command-Option-Escape to force quit it.]  
2) In Finder, /Applications/SmartBear/soapUI-5.0.0.app > Show Package Contents.  
3) Edit /Applications/SmartBear/soapUI-5.0.0.app/Contents/java/app/bin/soapui.sh.  
4) Uncomment this line# JAVA_OPTS="$JAVA_OPTS -Dsoapui.browser.disabled=true". [In other words, remove the "#" to stop it being a comment.]  
5) Edit /Applications/SmartBear/soapUI-5.0.0.app/Contents/vmoptions.txt.  
6) Add -Dsoapui.browser.disabled=true.  
7) Start soapUI.  

* [How to fix SoapUI freeze in Mac OS](http://chanukadissanayake.blogspot.com/2016/08/how-to-fix-soapui-freeze-in-mac-os.html)

### 6.5 Debugging
Set breakpoint to ‘client.invoke()’ in method sendSynchronousMessage() in WebServiceClient.java. Check that the web service url is the same one with the dummy soap service.

### 6.6 SOAP request and SOAP response
The soap request and response for tax api are stored in table `WebserviceRequestLog`. Use the following AQL query to find them.
```sql
select this, TimeCreated, this.RequestType, this.AdditionalInformation
from WebserviceRequestLog
where TimeCreated >= Date('2019-09-23 00:00:00 PST') and TimeCreated < Date('2019-09-24 00:00:00 PST')
order by TimeCreated desc

select this, TimeCreated, this.RequestType, this.AdditionalInformation
from WebserviceRequestLog where this.AdditionalInformation like '%INV36987875%'
```

## 7. Git and GitHub
### 7.1 Find code owner on Github
1) Open file `CODEOWNERS`, locates in /ssp_git/ariba/ond/Buyer/.github.  
2) Search the component name and find the team/owner of it. eg. Ariba-Ond/BuyerInvoicing.
```sh
/admin/ @Ariba-Ond/BuyerAdmin @Ariba-Ond/buyer_dev_master
/aggregation/ @Ariba-Ond/BuyerPurchasing @Ariba-Ond/buyer_dev_master
/aggregationui/ @Ariba-Ond/BuyerPurchasing @Ariba-Ond/buyer_dev_master
/analysis/ @Ariba-Ond/RC @Ariba-Ond/buyer_dev_master
/app/ @Ariba-Ond/BuyerApp @Ariba-Ond/BuyerProcurement @Ariba-Ond/buyer_dev_master
/app/payment/ @Ariba-Ond/PlatformAppPayment @Ariba-Ond/buyer_dev_master
/app/reconciliation/ @Ariba-Ond/PlatformAppReconciliation @Ariba-Ond/buyer_dev_master
/app/tax/ @Ariba-Ond/PlatformAppTax @Ariba-Ond/buyer_dev_master
/budget/ @Ariba-Ond/BuyerBudget @Ariba-Ond/buyer_dev_master
/budgetui/ @Ariba-Ond/BuyerBudget @Ariba-Ond/buyer_dev_master
/buildinfo/ @Ariba-Ond/RC @Ariba-Ond/buyer_dev_master
/buyeruitest/ @Ariba-Ond/BuyeruiTest @Ariba-Ond/buyer_dev_master
/catalog/ @Ariba-Ond/Buyer-Mobile @Ariba-Ond/buyer_dev_master @Ariba-Ond/Buyer-Catalog
/charge/ @Ariba-Ond/BuyerCharge @Ariba-Ond/buyer_dev_master
/chargeui/ @Ariba-Ond/BuyerCharge @Ariba-Ond/buyer_dev_master
/collaboration/ @Ariba-Ond/BuyerServicesProcurement @Ariba-Ond/buyer_dev_master
/collaborationui/ @Ariba-Ond/BuyerServicesProcurement @Ariba-Ond/buyer_dev_master
/collabservice/ @Ariba-Ond/buyercollabservice @Ariba-Ond/buyer_dev_master
/content/ @Ariba-Ond/BuyerContent @Ariba-Ond/buyer_dev_master
/contentaux/ @Ariba-Ond/BuyerContentaux @Ariba-Ond/buyer_dev_master
/contentmgmt/ @Ariba-Ond/ContentMgmt @Ariba-Ond/buyer_dev_master
/contentui/ @Ariba-Ond/BuyerContent @Ariba-Ond/buyer_dev_master
/contract/ @Ariba-Ond/BuyerContract @Ariba-Ond/buyer_dev_master
/cxml/ @Ariba-Ond/BuyerCXML @Ariba-Ond/buyer_dev_master
/electronicorder/ @Ariba-Ond/RC @Ariba-Ond/buyer_dev_master
/expense/ @Ariba-Ond/BuyerExpense @Ariba-Ond/buyer_dev_master
/expenseerp/ @Ariba-Ond/BuyerERP @Ariba-Ond/buyer_dev_master
/expenseui/ @Ariba-Ond/BuyerExpense @Ariba-Ond/buyer_dev_master
/guidedbuy/ @Ariba-Ond/Buyerguidedbuy @Ariba-Ond/buyer_dev_master
/integration/integrationtoolkit/main/ @Ariba-Ond/RC @Ariba-Ond/buyer_dev_master
/invoicing/ @Ariba-Ond/BuyerInvoicing @Ariba-Ond/buyer_dev_master
/invoicingerp/ @Ariba-Ond/BuyerInvoicingERP @Ariba-Ond/buyer_dev_master
/itemmaster/ @Ariba-Ond/BuyerPurchasing @Ariba-Ond/buyer_dev_master
/j2ee/ @Ariba-Ond/Buyer-Mobile @Ariba-Ond/buyer_dev_master
/kitting/ @Ariba-Ond/BuyerKitting @Ariba-Ond/buyer_dev_master
/l2charge/ @Ariba-Ond/RC @Ariba-Ond/buyer_dev_master
/main/ @Ariba-Ond/BuyerMain @Ariba-Ond/buyer_dev_master
/mainerp/ @Ariba-Ond/BuyerERP @Ariba-Ond/buyer_dev_master
/mainui/ @Ariba-Ond/BuyerMain @Ariba-Ond/buyer_dev_master @Ariba-Ond/Buyer-Catalog
/migrate/ @Ariba-Ond/BuyerMigrate @Ariba-Ond/buyer_dev_master
/migrate/generic/etc/sql/dbpatches/ @Ariba-Ond/buyer-migrate-dbpatches @Ariba-Ond/buyer_dev_master @Ariba-Ond/BuyerMigrate
/mobile/ @Ariba-Ond/Buyer-Mobile @Ariba-Ond/buyer_dev_master
/payment/ @Ariba-Ond/BuyerPayment @Ariba-Ond/buyer_dev_master
/paymentui/ @Ariba-Ond/BuyerPayment @Ariba-Ond/buyer_dev_master
/pcard/ @Ariba-Ond/BuyerPCard @Ariba-Ond/buyer_dev_master
/procure/ @Ariba-Ond/BuyerProcure @Ariba-Ond/buyer_dev_master
/procure/ariba/procure/server/ @Ariba-Ond/Buyer-Catalog
/procureerp/ @Ariba-Ond/BuyerProcure @Ariba-Ond/buyer_dev_master
/procurementdesk/ @Ariba-Ond/BuyerProcurementDesk @Ariba-Ond/buyer_dev_master
/procureui/ @Ariba-Ond/BuyerProcure @Ariba-Ond/buyer_dev_master
/purchasing/ @Ariba-Ond/BuyerPurchasing @Ariba-Ond/buyer_dev_master
/receiving/ @Ariba-Ond/BuyerReceiving @Ariba-Ond/buyer_dev_master
/restapi/ @Ariba-Ond/BuyerRestAPI @Ariba-Ond/buyer_dev_master
/sample/ @Ariba-Ond/RC @Ariba-Ond/buyer_dev_master
/servicesheet/ @Ariba-Ond/BuyerServiceSheet @Ariba-Ond/buyer_dev_master
/spendcategory/ @Ariba-Ond/BuyerServicesProcurement @Ariba-Ond/buyer_dev_master
/test-accrual/ @Ariba-Ond/BuyerTest @Ariba-Ond/buyer_dev_master
/test-base/ @Ariba-Ond/BuyerTest @Ariba-Ond/buyer_dev_master
/test-budget/ @Ariba-Ond/BuyerTest @Ariba-Ond/buyer_dev_master
/test-buyer-mobile/ @Ariba-Ond/Buyer-Mobile @Ariba-Ond/buyer_dev_master
/test-charge/ @Ariba-Ond/BuyerTest @Ariba-Ond/buyer_dev_master
/test-collaboration/ @Ariba-Ond/BuyerTest @Ariba-Ond/buyer_dev_master
/test-content/ @Ariba-Ond/BuyerTest @Ariba-Ond/buyer_dev_master
/test-contract/ @Ariba-Ond/BuyerTest @Ariba-Ond/buyer_dev_master
/test-etc/ @Ariba-Ond/RC @Ariba-Ond/buyer_dev_master
/test-expense/ @Ariba-Ond/BuyerTest @Ariba-Ond/buyer_dev_master
/test-expenseerp/ @Ariba-Ond/BuyerTest @Ariba-Ond/buyer_dev_master
/test-guidedbuy/ @Ariba-Ond/Buyerguidedbuy @Ariba-Ond/buyer_dev_master
/test-integrationtoolkitBuyer/ @Ariba-Ond/BuyerTest @Ariba-Ond/buyer_dev_master
/test-invoicing/ @Ariba-Ond/BuyerTest @Ariba-Ond/BuyerInvoicing @Ariba-Ond/buyer_dev_master @Ariba-Ond/Buyertest-invoicing
/test-invoicingerp/ @Ariba-Ond/BuyerTest @Ariba-Ond/BuyerInvoicing @Ariba-Ond/buyer_dev_master
/test-mainerp/ @Ariba-Ond/BuyerTest @Ariba-Ond/buyer_dev_master
/test-msg/ @Ariba-Ond/Buyertest-msg @Ariba-Ond/buyer_dev_master
/test-payment/ @Ariba-Ond/BuyerTest @Ariba-Ond/BuyerPayment @Ariba-Ond/buyer_dev_master @Ariba-Ond/Buyertest-invoicing
/test-procure-reportingapi/ @Ariba-Ond/BuyerTest @Ariba-Ond/buyer_dev_master
/test-procure/ @Ariba-Ond/BuyerTest @Ariba-Ond/buyer_dev_master
/test-procureerp/ @Ariba-Ond/BuyerTest @Ariba-Ond/buyer_dev_master
/test-procureui/ @Ariba-Ond/BuyerTest @Ariba-Ond/buyer_dev_master
/test-reports/ @Ariba-Ond/BuyerTest @Ariba-Ond/buyer_dev_master
/test-restapi/ @Ariba-Ond/BuyerRestAPI @Ariba-Ond/buyer_dev_master
/test-servicesheet/ @Ariba-Ond/BuyerTest @Ariba-Ond/buyer_dev_master
/test-spotbuy/ @Ariba-Ond/Buyertest-spotbuy @Ariba-Ond/buyer_dev_master
/test-workforce/ @Ariba-Ond/BuyerTest @Ariba-Ond/buyer_dev_master
/tools/ @Ariba-Ond/BuyerTools @Ariba-Ond/buyer_dev_master
/uitest/ @Ariba-Ond/BuyeruiTest @Ariba-Ond/buyer_dev_master
/workforce/ @Ariba-Ond/BuyerServicesProcurement @Ariba-Ond/buyer_dev_master
/workforceui/ @Ariba-Ond/BuyerServicesProcurement @Ariba-Ond/buyer_dev_master
pom.xml @Ariba-Ond/RC @Ariba-Ond/buyer_dev_master
*.pml @Ariba-Ond/PMLReviewers @Ariba-Ond/buyer_dev_master
*.module @Ariba-Ond/RC @Ariba-Ond/buyer_dev_master
```
3) Go to https://github.wdf.sap.corp/orgs/Ariba-Ond/teams, search for that team/component owner.  
4) Add any user to your pull request.

### 7.2 Migrate change from dev to trunk
```sh
#1. switch to trunk
checkout trunk git checkout origin/trunk
#2. Create new branch for trunk
git branch SINV-8075-Missing-In-Trunk
#3. Cherry pick the pull requests which were created for dev branch
git cherry-pick b17bddc27b9530cb8fe2e9456d2439f82bd33234
git cherry-pick 01d034d1024b0501efb1f767f9888b20a882a9db
git cherry-pick 1ad978bb19e856ee4ac060515b6412e71e15ff6b
#4. No need to Commit just push to remote
git push
#6 check the pull request in github.
#7 switch back to dev branch
```
Attentions
* Don’t compile if ‘git pull’ or after any update.
* Double check whether branch is created for trunk branch via ‘git log’.
* Double check the files changed in pull request on github, no more no less.
* Try ‘git pull’ first if confilict occurs or fail to push to remote.

### 7.3 HF, HotFix to master branch
```sh
#1. switch to master
git checkout master
#2. Create new branch for master
git branch IMS-1699
#3. Fetch new changes
git fetch
#4. Commit
git commit -m “migrate from dev to trunk”
#5. Push to remote,
git push
#6. If necessary, push to the same pull request.
git push –force origin IMS-1699
#7. check the pull request in github.
#8. switch back to dev branch
```
### 7.4 Limited hotfix to limited_hf branch
```sh
#1. switch to master
git checkout master
#2. Create new branch for master
git branch limited_hf_IMS_1699
#3. Switch to the new branch
git checkout limited_hf_IMS_1699
#4. Fetch latest git status
git fetch
#5. Reset to the targeted remote branch, eg. limited_hf
git reset --hard origin/limited_hf
#6. Make the changes, commit them and push to the remote branch
#7. Check the changes in remote branch, eg. limited_hf
```
### 7.5 Revert change from trunk
```sh
#1. switch to trunk
git checkout trunk
#2. Create new branch for trunk
git branch SINV-8373-editibility-trunk-revert
#3. Revert the pull requests from the latest to the oldest
git revert 98d9b50a3a4f7cc1f3e71e57a8a28b21e4383fee
git revert 838627a1e8dea986851ea6997df9148e739b32a4
git revert b348ec4867bc9cd99f3c51910437aa251ec34385
#4. No need to Commit just push to remote
git push
#6 check the pull request in github.
#7 switch back to dev branch
```
### 7.6 Fix compilation error for PR, ‘This branch is out-of-date with the base branch’
```sh
git checkout dev
git pull origin dev
git checkout SINV-8872-attachement
git merge dev
git push
```

## 8. References
* [Install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

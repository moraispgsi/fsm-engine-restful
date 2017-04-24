/**
 * Created by Ricardo Morais on 13/04/2017.
 */
let fsmEngine = require("../index");

let  definition=`
<scxml
    xmlns="http://www.w3.org/2005/07/scxml"
    version="1.0"
    profile="ecmascript"
    initial="initial_default">
    
    <datamodel>
        <data id="context" expr="{}"/>
    </datamodel>
    <state id="initial_default">
        <onentry>
            <script>
            this.setInstanceProperty(context, {propertyName: "test", value: "testValues"});
            this.log(context, {title: "Example1:", text: "My first example"});
            </script>
        </onentry>
    </state>
</scxml>
`;

fsmEngine.makeInstancePromise(definition).then((instance)=>{
    instance.start();
});


import {Value} from './value';
import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class ContextModelProperty {

    @JsonProperty('property', Value)
    rdf_name: Value = new Value();

    printInfo() {
        console.log('cm_property = ' + this.rdf_name.value);
    }

}

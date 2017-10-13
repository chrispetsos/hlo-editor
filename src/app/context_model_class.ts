import {Value} from './value';
import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class ContextModelClass {

    @JsonProperty('class', Value)
    rdf_name: Value = undefined;

    printInfo() {
        console.log('cm_class = ' + this.rdf_name.value);
    }

}

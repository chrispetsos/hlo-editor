import {Value} from './value';
import {JsonObject, JsonProperty} from 'json2typescript';

@JsonObject
export class ContextModelClass {

    @JsonProperty('class', Value)
    cm_class: Value = undefined;

    printInfo() {
        console.log('cm_class = ' + this.cm_class.value);
    }

}
